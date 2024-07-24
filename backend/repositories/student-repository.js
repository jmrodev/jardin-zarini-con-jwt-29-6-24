import Student from '../models/studentSchema.js'
import crypto from 'crypto'
export default class StudentRepository {
  static async createStudentRepository(studentData) {
    // Validation.validateStudentData(studentData);

    const existingStudent =  await Student.findOne({ dni: studentData.dni });
    if (existingStudent) {
      throw new Error('A student with this DNI already exists');
    }

    const id = crypto.randomUUID()
    const student = await Student.create({
      _id: id,
      ...studentData
    }).save()
    return await student
  }

  static async getAll () {
    return Student.find()
  }

  static async getById (id) {
    const student = await Student.findOne({ _id: id });
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

   // Validation.validateUpdateData(updateData);

    if (updateData.dni && updateData.dni !== student.dni) {
      const existingStudent = Student.findOne({ dni: updateData.dni });
      if (existingStudent) {
        throw new Error('A student with this DNI already exists');
      }
    }

    Object.assign(student, updateData)
    return await student.save()
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