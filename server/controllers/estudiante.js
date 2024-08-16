import { Estudiante } from '../models/models.js';

// Obtener todos los estudiantes
export const todosEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        res.status(500).send('Error al obtener los estudiantes');
    }
};

export const obtenerEstudiantePorId = async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.json(estudiante);
    } catch (error) {
        console.error('Error al obtener el estudiante:', error);
        res.status(500).send('Error al obtener el estudiante');
    }
};


// Crear un nuevo estudiante
export const crearEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, genero } = req.body;
        const estudiante = new Estudiante({ nombre, apellido, genero });
        await estudiante.save();
        res.status(201).json(estudiante);
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        res.status(500).send('Error al crear el estudiante');
    }
};

export const actualizarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.json(estudiante);
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        res.status(500).send('Error al actualizar el estudiante');
    }
};


export const eliminarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.json({ message: 'Estudiante eliminado' });
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        res.status(500).send('Error al eliminar el estudiante');
    }
};
