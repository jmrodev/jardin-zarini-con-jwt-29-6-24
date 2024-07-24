export default class Validation {
  static validateStudentData(data) {
    const errors = []

    if (!data.name || typeof data.name !== 'string') {
      errors.push('Invalid name: The name is required and must be a string.')
    }
    if (!data.dni || typeof data.dni !== 'number') {
      errors.push('Invalid DNI: The DNI is required and must be a number.')
    }
    if (!data.birth_date || !/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)) {
      errors.push(
        'Invalid birth date format: The birth date is required and must be in the format YYYY-MM-DD.'
      )
    }
    if (!data.address || typeof data.address !== 'string') {
      errors.push(
        'Invalid address: The address is required and must be a string.'
      )
    }
    if (!Array.isArray(data.contacts) || data.contacts.length === 0) {
      errors.push(
        'Invalid contacts: At least one contact is required and must be an array.'
      )
    }
    if (!['morning', 'afternoon'].includes(data.turn)) {
      errors.push(
        'Invalid turn: The turn must be either "morning" or "afternoon".'
      )
    }
    if (!data.classRoom || typeof data.classRoom !== 'string') {
      errors.push(
        'Invalid classRoom: The classRoom is required and must be a string.'
      )
    }
    if (!data.teacherId || typeof data.teacherId !== 'string') {
      errors.push(
        'Invalid teacherId: The teacherId is required and must be a string.'
      )
    }

    if (errors.length > 0) {
      return { isValid: false, messages: errors }
    }

    return {
      isValid: true,
      message: 'Update validation successful. The update data is valid.',
    }
  }

  static validateUpdateData(data) {
    const errors = []

    if (data.name && typeof data.name !== 'string') {
      errors.push('Invalid name: If provided, the name must be a string.')
    }
    if (data.dni && typeof data.dni !== 'number') {
      errors.push('Invalid DNI: If provided, the DNI must be a number.')
    }
    if (data.birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)) {
      errors.push(
        'Invalid birth date format: If provided, the birth date must be in the format YYYY-MM-DD.'
      )
    }
    if (data.address && typeof data.address !== 'string') {
      errors.push('Invalid address: If provided, the address must be a string.')
    }
    if (
      data.contacts &&
      (!Array.isArray(data.contacts) || data.contacts.length === 0)
    ) {
      errors.push(
        'Invalid contacts: If provided, contacts must be an array and at least one contact is required.'
      )
    }
    if (data.turn && !['morning', 'afternoon'].includes(data.turn)) {
      errors.push(
        'Invalid turn: If provided, the turn must be either "morning" or "afternoon".'
      )
    }
    if (data.classRoom && typeof data.classRoom !== 'string') {
      errors.push(
        'Invalid classRoom: If provided, the classRoom must be a string.'
      )
    }
    if (data.teacherId && typeof data.teacherId !== 'string') {
      errors.push(
        'Invalid teacherId: If provided, the teacherId must be a string.'
      )
    }

    if (errors.length > 0) {
      return { isValid: false, messages: errors }
    }
    return {
      isValid: true,
      message: 'Update validation successful. The update data is valid.',
    }
  }
}
