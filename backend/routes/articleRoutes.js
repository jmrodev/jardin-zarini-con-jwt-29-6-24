// routes/articleRoutes.js
import express from 'express';
import {
  createArticleController,
  getAllArticlesController,
  updateArticleController,
  deleteArticleController,
  getArticleByIdController,
} from '../controllers/articleController.js';
import { authorize } from '../middlewares/authMiddleware.js';
import { PERMISSIONS } from '../config/roles.js';

const router = express.Router();

// Rutas protegidas para artículos
router.post(
  '/',
  authorize([PERMISSIONS.CREATE_ARTICLE]),
  (req, res) => {
    createArticleController(req, res);
  }
);

router.get(
  '/',
  authorize([PERMISSIONS.READ_ARTICLE]),
  (req, res) => {
    getAllArticlesController(req, res);
  }
);

router.get(
  '/:id',
  authorize([PERMISSIONS.READ_ARTICLE]),
  (req, res) => {
    getArticleByIdController(req, res);
  }
);

router.put(
  '/:id',
  authorize([PERMISSIONS.UPDATE_ARTICLE]),
  (req, res) => {
    updateArticleController(req, res);
  }
);

router.delete(
  '/:id',
  authorize([PERMISSIONS.DELETE_ARTICLE]),
  (req, res) => {
    deleteArticleController(req, res);
  }
);

export default router;
