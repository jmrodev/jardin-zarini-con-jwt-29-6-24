import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository.js';
import { SECRET_JWT_KEY } from '../config/config.js';

export const loginUserService = async ({ username, password }) => {
  const user = await UserRepository.loginUserRepository({ username, password });
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions,
      classRoom: user.classRoom,
    },
    SECRET_JWT_KEY,
    { expiresIn: '1h' }
  );
  return { user, token };
};

export const logoutUserService = async  (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};
