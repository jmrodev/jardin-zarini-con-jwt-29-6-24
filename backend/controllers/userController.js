import { loginUserService, logoutUserService } from '../services/authService.js'
import { createUserService } from '../services/userManagementService.js'
import logger from '../utils/logger.js'
import { ROLE_PERMISSIONS } from '../config/roles.js'
import { hasPermission } from '../utils/permissionUtils.js'

export const loginUserController = async (req, res) => {
  const { username, password } = req.body

  try {
    const { user, token } = await loginUserService({ username, password })

    res
      .cookie('access_token', token, {httpOnly: true})
      .send.json( user )
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

export const createUserController = async (req, res) => {
  const userData = req.body;

  const validationErrors = Validation.validateUserData(userData);

  if (!validationErrors.isValid) {
    return res.status(400).json({ error: validationErrors.messages });
  }

  try {
    const newUser = await createUserService(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error en createUserController:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    // Verifica si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'No authenticated user found' })
    }

    const { username } = req.user

    // Registra el intento de logout
    logger.info(`Logout attempt for user: ${username}`)

    // Limpia la cookie del token
    logoutUserService(req, res)

    // Envía una respuesta exitosa
    res.status(200).json({
      message: 'Logout successful',
      redirectUrl: '/login',
      clearLocalStorage: true,
    })

    // Registra el logout exitoso
    logger.info(`User logged out successfully: ${username}`)
  } catch (error) {
    // Registra el error
    logger.error(
      `Error during logout for user: ${req.user?.username || 'unknown'}`,
      { error }
    )

    // Envía una respuesta de error
    res.status(500).json({
      message: 'Error during logout process',
      error:
        process.env.NODE_ENV === 'production'
          ? 'An unexpected error occurred'
          : error.message,
    })
  }
}
