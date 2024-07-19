import { UserRepository } from '../repositories/user-repository.js';

export async function createUser({ username, password, role }) {
    try {
      const id = await UserRepository.create({
        username,
        password,
        role,
      });
      return { id };
    } catch (error) {
      throw new Error(error.message);
    }
  }

