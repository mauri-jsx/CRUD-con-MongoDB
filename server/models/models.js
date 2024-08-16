import mongoose from "mongoose";

// Definir el esquema para el modelo de Estudiante
const estudianteSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        trim: true,  // Elimina espacios en blanco al inicio y al final
        maxlength: 50
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    genero: {
        type: String,
        required: true,
        enum: ['Masculino', 'Femenino', 'Otro'],  // Solo permite estos valores
    }
});

// Crear y exportar el modelo
export const Estudiante = mongoose.model("Estudiante", estudianteSchema);
