// models/userSchema.js
import DBLocal from 'db-local';

const { Schema } = new DBLocal({ path: './db' })

const ArticleSchema = Schema('Article', {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    

})

export default ArticleSchema