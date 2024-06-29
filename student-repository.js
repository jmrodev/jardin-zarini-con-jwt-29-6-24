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
    return Student.findOne({ _id: id })
  }

  static async getByParentId (parentId) {
    return Student.find(student => student.contacts.some(contact => contact.id === parentId))
  }

  static async update (id, updateData) {
    const student = Student.findOne({ _id: id })
    if (!student) {
      throw new Error('Student not found')
    }
    Object.assign(student, updateData)
    return student.save()
  }
}