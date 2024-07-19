// validators/userValidators.js

export function validateUsername(username) {
    const userNameRegexp = '^[A-Za-z]+$';
    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (username.match(userNameRegexp) === null) {
      throw new Error('Username must contain only letters');
    }
  }
  
  export function validatePassword(password) {
    const passwordRegexp = '^[A-Za-z\\d$@$!%*?&]+$';
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a valid string');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (password.match(passwordRegexp) === null) {
      throw new Error('Password must contain only letters, numbers, and some special characters without spaces');
    }
  }
  