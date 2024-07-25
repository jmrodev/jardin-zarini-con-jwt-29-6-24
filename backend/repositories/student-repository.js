import StudentSchema from '../models/studentSchema.js'
import crypto from 'crypto'
import Validation  from '../validators/studenValidators.js'


export default class StudentRepository {
  static async createStudentRepository(studentData) {

     Validation.validateStudentData(studentData);
     
    const existingStudent =  await StudentSchema.findOne({ dni: studentData.dni });
    if (existingStudent) {
      throw new Error('A student with this DNI already exists');
    }

    const id = crypto.randomUUID()
    const student = await StudentSchema.create({
      _id: id,
      ...studentData
    }).save()
    return await student
  }

  static async getStudentsRepository () {
    return StudentSchema.find()
  }

  static async getStudentByIdRepository (id) {
    console.log('id repository', id);
    const student = await StudentSchema.findOne({ _id: id });
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  static async getByParentIdRepository (parentId) {
    return StudentSchema.find(student => student.contacts.some(contact => contact.id === parentId))
  }

  static async update (id, updateData) {
    const student = await this.getById(id);
    
    if (Object.keys(updateData).length === 0) {
      throw new Error('No update data provided');
    }

    Validation.validateUpdateData(updateData);

    if (updateData.dni && updateData.dni !== student.dni) {
      const existingStudent = StudentSchema.findOne({ dni: updateData.dni });
      if (existingStudent) {
        throw new Error('A student with this DNI already exists');
      }
    }

    Object.assign(student, updateData)
    return await student.save()
  }

  static async deleteStudentRepository (id) {
    const student = await this.getStudentByIdRepository(id);
    StudentSchema.remove({ _id: id });
    return { message: 'Student deleted successfully' };
  }
}