// models/userSchema.js
import DBLocal from 'db-local';

const { Schema } = new DBLocal({ path: './db' });

const UserSchema = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  permissions: { type: Array, default: [] },
  classRoom: { type: String },
});

export default UserSchema;