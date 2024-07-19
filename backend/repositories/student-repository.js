import DBLocal from 'db-local'
import crypto from 'crypto'

const { Schema } = new DBLocal({ path: './db' })

const Student = Schema('Student', {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  dni: { type: Number, required: true },
  birth_date: { type: String, required: true },
  address: { type: String, required: true },
  contacts: { type: Array, required: true },
  turn: { type: String, required: true },
  classRoom: { type: String, required: true },
  teacherId: { type: String, required: true }
})

export class StudentRepository {
  static async create (studentData) {
    Validation.validateStudentData(studentData);

    const existingStudent = Student.findOne({ dni: studentData.dni });
    if (existingStudent) {
      throw new Error('A student with this DNI already exists');
    }

    const id = crypto.randomUUID()
    const student = Student.create({
      _id: id,
      ...studentData
    }).save()
    return student
  }

  static async getAll () {
    return Student.find()
  }

  static async getById (id) {
    const student = Student.findOne({ _id: id });
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  static async getByParentId (parentId) {
    return Student.find(student => student.contacts.some(contact => contact.id === parentId))
  }

  static async update (id, updateData) {
    const student = await this.getById(id);
    
    if (Object.keys(updateData).length === 0) {
      throw new Error('No update data provided');
    }

    Validation.validateUpdateData(updateData);

    if (updateData.dni && updateData.dni !== student.dni) {
      const existingStudent = Student.findOne({ dni: updateData.dni });
      if (existingStudent) {
        throw new Error('A student with this DNI already exists');
      }
    }

    Object.assign(student, updateData)
    return student.save()
  }

  static async delete (id) {
    const student = await this.getById(id);
    Student.deleteOne({ _id: id });
    return { message: 'Student deleted successfully' };
  }
}

class Validation {
  static validateStudentData(data) {
    if (!data.name || typeof data.name !== 'string') {
      throw new Error('Invalid name');
    }
    if (!data.dni || typeof data.dni !== 'number') {
      throw new Error('Invalid DNI');
    }
    if (!data.birth_date || !/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)) {
      throw new Error('Invalid birth date format. Use YYYY-MM-DD');
    }
    if (!data.address || typeof data.address !== 'string') {
      throw new Error('Invalid address');
    }
    if (!Array.isArray(data.contacts) || data.contacts.length === 0) {
      throw new Error('At least one contact is required');
    }
    if (!['morning', 'afternoon'].includes(data.turn)) {
      throw new Error('Invalid turn. Must be "morning" or "afternoon"');
    }
    if (!data.classRoom || typeof data.classRoom !== 'string') {
      throw new Error('Invalid classRoom');
    }
    if (!data.teacherId || typeof data.teacherId !== 'string') {
      throw new Error('Invalid teacherId');
    }
  }

  static validateUpdateData(data) {
    if (data.name && typeof data.name !== 'string') {
      throw new Error('Invalid name');
    }
    if (data.dni && typeof data.dni !== 'number') {
      throw new Error('Invalid DNI');
    }
    if (data.birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)) {
      throw new Error('Invalid birth date format. Use YYYY-MM-DD');
    }
    if (data.address && typeof data.address !== 'string') {
      throw new Error('Invalid address');
    }
    if (data.contacts && (!Array.isArray(data.contacts) || data.contacts.length === 0)) {
      throw new Error('At least one contact is required');
    }
    if (data.turn && !['morning', 'afternoon'].includes(data.turn)) {
      throw new Error('Invalid turn. Must be "morning" or "afternoon"');
    }
    if (data.classRoom && typeof data.classRoom !== 'string') {
      throw new Error('Invalid classRoom');
    }
    if (data.teacherId && typeof data.teacherId !== 'string') {
      throw new Error('Invalid teacherId');
    }
  }
}