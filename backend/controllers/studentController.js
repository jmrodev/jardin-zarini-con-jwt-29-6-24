import StudentRepository from '../repositories/student-repository.js'
import Validation from '../validators/studenValidators.js'

export const createStudentController = async (req, res) => {

  const studentData = req.body
  const validationErrors = Validation.validateStudentData(studentData)
    if (!validationErrors.isValid) {
    return res.status(400).json({ error: validationErrors.messages })
  }

  try {
    const newStudent = await StudentRepository.createStudentRepository(
      studentData
    )
    res.json(newStudent)
  } catch (error) {
    console.error('Error en createStudentController:', error)
    res.status(500).json({ error: 'Error al crear el estudiante' })
  }
}

export const getAllStudentsController = async (req, res) => {

  try {
    const students = await StudentRepository.getStudentsRepository()
    res.json(students)
  } catch (error) {
    console.error('Error en getAllStudentsController:', error)
    res.status(500).json({ error: 'Error al obtener los estudiantes' })
  }
}

export const getStudentByIdController = async (req, res) => {
  console.log("aqui llega");
  console.log('req.params controller', req.params);
  const { id } = req.params

  try {
    const student = await StudentRepository.getStudentByIdRepository(id)
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' })
    }
    res.json(student)
  } catch (error) {
    console.error('Error en getStudentByIdController:', error)
    res.status(500).json({ error: 'Error al obtener el estudiante' })
  }
}

export const deleteStudentController = async (req, res) => {
  console.log('req.params delete', req.params);
  const { id } = req.params

  try {
    const deletedStudent = await StudentRepository.deleteStudentRepository(id)
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Estudiante no encontrado' })
    }
    res.json(deletedStudent)
  } catch (error) {
    console.error('Error en deleteStudentController:', error)
    res.status(500).json({ error: 'Error al eliminar el estudiante' })
  }
}

export const updateStudentController = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: User not authenticated' })
  }

  const { id } = req.params
  const updateData = req.body

  // // Now you can safely check the role
  // if (req.user.role !== ROLES.ADMIN && updateData.classRoom) {
  //   return res
  //     .status(403)
  //     .json({ message: 'No tienes permiso para cambiar el aula' })
  // }

  // // Verificación adicional de permisos si es necesario
  // if (req.user.role !== ROLES.ADMIN && updateData.classRoom) {
  //   return res
  //     .status(403)
  //     .json({ message: 'No tienes permiso para cambiar el aula' })
  // }

  try {
    const updatedStudent = await StudentRepository.updateStudentRepository(
      id,
      updateData
    )
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Estudiante no encontrado' })
    }
    res.json(updatedStudent)
  } catch (error) {
    console.error('Error en updateStudentController:', error)
    res.status(500).json({ error: 'Error al actualizar el estudiante' })
  }
}
