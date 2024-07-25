// routes/studentRoutes.js
import express from 'express'
import {
  createStudentController,
  getAllStudentsController,
  updateStudentController,
  deleteStudentController,
  getStudentByIdController,
} from '../controllers/studentController.js'
import { authorize } from '../middlewares/authMiddleware.js'
import { PERMISSIONS } from '../config/roles.js'

const router = express.Router()

router.post('/', authorize([PERMISSIONS.CREATE_STUDENT]), (req, res) => {
  createStudentController(req, res)
})

router.get('/:id', authorize([PERMISSIONS.READ_STUDENT]), (req, res) => {
  console.log('req.params get id', req.params)
  getStudentByIdController(req, res)
})

router.get('/', authorize([PERMISSIONS.READ_STUDENT]), getAllStudentsController)
router.put(
  '/:id',
  authorize([PERMISSIONS.UPDATE_STUDENT]),
  updateStudentController
)
router.delete('/:id', authorize([PERMISSIONS.DELETE_STUDENT]), (req, res) => {
  deleteStudentController(req, res)
})

export default router
