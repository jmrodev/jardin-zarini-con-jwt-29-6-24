// utils/securityUtils.js
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { SALTROUNDS } from '../config/config.js';

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALTROUNDS);
}

export function generateUniqueId() {
  return crypto.randomUUID();
}

