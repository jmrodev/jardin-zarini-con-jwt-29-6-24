// routes/studentRoutes.js
import express from 'express'
import {
  createStudentController,
  getAllStudentsController,
  updateStudentController,
  deleteStudentController,
} from '../controllers/studentController.js'
import { authorize } from '../middlewares/authMiddleware.js'
import { PERMISSIONS } from '../config/roles.js'

const router = express.Router()

router.post(
  '/',
  authorize([PERMISSIONS.CREATE_STUDENT]),
  (req, res) => {
    createStudentController(req, res)
  }
)

router.get(
  '/',
  authorize([PERMISSIONS.READ_STUDENT]),
  getAllStudentsController
)
router.put(
  '/:id',
  authorize([PERMISSIONS.UPDATE_STUDENT]),
  updateStudentController
)
router.delete(
  '/:id',
  authorize([PERMISSIONS.DELETE_STUDENT]),
  deleteStudentController
)

export default router
