import StudentRepository from '../repositories/student-repository.js'
export const createStudentController = async (req, res) => {
  const studentData = req.body;

  // Validar datos del estudiante antes de crear
  if (!studentData.name || !studentData.classRoom || !studentData.birthDate) {
    return res.status(400).json({ error: 'Faltan datos necesarios del estudiante' });
  }

  // Validar el formato de la fecha de nacimiento
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(studentData.birthDate)) {
    return res.status(400).json({ error: 'Formato de fecha de nacimiento inválido. Use YYYY-MM-DD' });
  }

  try {
    const newStudent = await StudentRepository.createStudentRepository(studentData);
    res.json(newStudent);
  } catch (error) {
    console.error('Error en createStudentController:', error);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};


export const getAllStudentsController = async (req, res) => {
  try {
    const students = await StudentRepository.getStudentsRepository();
    res.json(students);
  } catch (error) {
    console.error('Error en getAllStudentsController:', error);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
}

export const getStudentByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentRepository.getStudentByIdRepository(id);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error en getStudentByIdController:', error);
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
}

export const deleteStudentController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await StudentRepository.deleteStudentRepository(id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(deletedStudent);
  } catch (error) {
    console.error('Error en deleteStudentController:', error);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
}

export const updateStudentController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Verificación adicional de permisos si es necesario
  if (req.user.role !== ROLES.ADMIN && updateData.classRoom) {
    return res.status(403).json({ message: 'No tienes permiso para cambiar el aula' });
  }

  try {
    const updatedStudent = await StudentRepository.updateStudentRepository(id, updateData);
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error en updateStudentController:', error);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
}
