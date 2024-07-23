
// models/userSchema.js
import DBLocal from 'db-local';

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

export default Student