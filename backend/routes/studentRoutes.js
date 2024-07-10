import express from 'express';
import { StudentRepository } from '../repositories/student-repository.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.get('/', authorize(['admin', 'directora', 'vicedirectora', 'preceptora']), async (req, res) => {
  const alumnos = await StudentRepository.getAll();
  res.json(alumnos);
});

router.put('/:id', authorize(['admin', 'preceptora', 'maestra']), async (req, res) => {
  const alumno = await StudentRepository.getById(req.params.id);
  if (req.session.user.role === 'maestra' && req.session.user.classRoom !== alumno.classRoom) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const updatedAlumno = await StudentRepository.update(req.params.id, req.body);
  res.json(updatedAlumno);
});

router.get('/mis-hijos', authorize(['padre']), async (req, res) => {
  const hijos = await StudentRepository.getByParentId(req.session.user.id);
  res.json(hijos);
});

router.put('/mis-hijos/:id', authorize(['padre']), async (req, res) => {
  const hijo = await StudentRepository.getById(req.params.id);
  if (hijo.classRoom !== 'sala3') {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const updatedHijo = await StudentRepository.update(req.params.id, req.body);
  res.json(updatedHijo);
});

router.post('/', authorize(['admin', 'preceptora', 'maestra']), async (req, res) => {
  if (req.session.user.role === 'maestra') {
    if (req.body.classRoom !== req.session.user.classRoom || req.body.classRoom === 'sala3') {
      return res.status(403).json({ message: 'No autorizado' });
    }
  }
  const newAlumno = await StudentRepository.create(req.body);
  res.status(201).json(newAlumno);
});

export default router;
