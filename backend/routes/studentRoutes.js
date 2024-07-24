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
  '/students',
  authorize([PERMISSIONS.CREATE_STUDENT]),
  (req, res) => {
    console.log("aqui aqui");
    console.log('req.body router post', req.body)
    createStudentController(req, res)
  }
)

router.get(
  '/students',
  authorize([PERMISSIONS.READ_STUDENT]),
  getAllStudentsController
)
router.put(
  '/students/:id',
  authorize([PERMISSIONS.UPDATE_STUDENT]),
  updateStudentController
)
router.delete(
  '/students/:id',
  authorize([PERMISSIONS.DELETE_STUDENT]),
  deleteStudentController
)

export default router
