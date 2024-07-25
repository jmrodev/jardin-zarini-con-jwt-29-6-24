import { validateEntries, validateUsername, validatePassword,checkIfUserExists } from './commonValidators.js';

export  default function validateUserData(userData) {
  const { username, password, role, permissions } = userData;
  const errors = [];

  // Validate all required fields are present
  try {
    validateEntries(username, password, role, permissions);
  } catch (error) {
    errors.push(error.message);
  }

  // Validate username
  try {
    validateUsername(username);
  } catch (error) {
    errors.push(error.message);
  }

  // Validate password
  try {
    validatePassword(password);
  } catch (error) {
    errors.push(error.message);
  }

  // Check if user already exists
  try {
    checkIfUserExists(username);
  } catch (error) {
    errors.push(error.message);
  }

  // If there are any errors, return them
  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors
    };
  }

  // If all validations pass
  return {
    isValid: true,
    message: 'User data is valid'
  };
}
