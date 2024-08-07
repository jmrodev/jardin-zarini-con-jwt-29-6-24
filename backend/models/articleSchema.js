// models/userSchema.js
import DBLocal from 'db-local'

const { Schema } = new DBLocal({ path: './db' })

const Articles = Schema('Articles', {
  _id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  author: { type: String, default: 'Unknown' },
})

export default Articles
