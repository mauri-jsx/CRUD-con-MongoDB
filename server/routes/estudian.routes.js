import { Router } from 'express';
import { todosEstudiantes,
          crearEstudiante,
          obtenerEstudiantePorId,
          actualizarEstudiante,
          eliminarEstudiante
         } from '../controllers/estudiante.js';

const router = Router();

// Rutas para las operaciones CRUD
router.get('/estudiantes', todosEstudiantes);
router.get('/estudiante/:id', obtenerEstudiantePorId);
router.post('/estudiantes', crearEstudiante);
router.put('/estudiante/:id', actualizarEstudiante);
router.delete('/estudiante/:id', eliminarEstudiante);


export { router };
