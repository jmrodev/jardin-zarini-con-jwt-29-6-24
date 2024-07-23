// routes/studentRoutes.js
import { authorize } from '../middlewares/authorize.js';
import { PERMISSIONS } from '../config/roles.js';

router.post('/students', authorize([PERMISSIONS.CREATE_STUDENT]), createStudentController);
router.get('/students', authorize([PERMISSIONS.READ_STUDENT]), getAllStudentsController);
router.put('/students/:id', authorize([PERMISSIONS.UPDATE_STUDENT]), updateStudentController);
router.delete('/students/:id', authorize([PERMISSIONS.DELETE_STUDENT]), deleteStudentController);