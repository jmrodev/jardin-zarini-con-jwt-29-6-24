export const createStudentController = async (req, res) => {
  const studentData = req.body

  try {
    const newStudent = await UserRepository.createStudentRepository(studentData)
    res.json(newStudent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getStudentsController = async (req, res) => {
  try {
    const students = await UserRepository.getStudentsRepository()
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getStudentByIdController = async (req, res) => {
  const { id } = req.params

  try {
    const student = await UserRepository.getStudentByIdRepository(id)
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteStudentController = async (req, res) => {
  const { id } = req.params

  try {
    const deletedStudent = await UserRepository.deleteStudentRepository(id)
    res.json(deletedStudent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateStudentController = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  // Verificación adicional de permisos si es necesario
  if (req.user.role !== ROLES.ADMIN && updateData.classRoom) {
    return res
      .status(403)
      .json({ message: 'No tienes permiso para cambiar el aula' })
  }

  try {
    const updatedStudent = await UserRepository.updateStudentRepository(
      id,
      updateData
    )
    res.json(updatedStudent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
