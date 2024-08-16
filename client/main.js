import Swal from 'sweetalert2';

// Definir la URL base
const BASE_URL = 'http://localhost:5000/api';

// Selección de elementos
const form = document.getElementById('student-form');
const studentsTable = document.getElementById('students-table').getElementsByTagName('tbody')[0];
let editingId = null; // Variable para guardar el ID del estudiante que se está editando

// Función para obtener todos los estudiantes
async function fetchEstudiantes() {
    try {
        const response = await fetch(`http://localhost:5000/estudiantes`);
        const estudiantes = await response.json();
        renderEstudiantes(estudiantes);
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
    }
}

// Función para renderizar estudiantes en la tabla
function renderEstudiantes(estudiantes) {
    studentsTable.innerHTML = '';
    estudiantes.forEach(estudiante => {
        const row = studentsTable.insertRow();
        row.insertCell(0).textContent = estudiante.nombre;
        row.insertCell(1).textContent = estudiante.apellido;
        row.insertCell(2).textContent = estudiante.genero;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `
            <button onclick="editEstudiante('${estudiante._id}')">Editar</button>
            <button onclick="deleteEstudiante('${estudiante._id}')">Eliminar</button>
        `;
    });
}

// Función para manejar el formulario de envío
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const nombre = formData.get('nombre');
    const apellido = formData.get('apellido');
    const genero = formData.get('genero');

    if (editingId) {
        // Actualizar estudiante
        try {
            await fetch(`http://localhost:5000/estudiante/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, genero })
            });
            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'El estudiante se ha actualizado correctamente.',
            });
            editingId = null; // Limpiar ID de edición
        } catch (error) {
            console.error('Error al actualizar el estudiante:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estudiante.',
            });
        }
    } else {
        // Crear nuevo estudiante
        try {
            await fetch(`http://localhost:5000/estudiantes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, genero })
            });
            Swal.fire({
                icon: 'success',
                title: 'Creación exitosa',
                text: 'El estudiante se ha creado correctamente.',
            });
        } catch (error) {
            console.error('Error al crear el estudiante:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el estudiante.',
            });
        }
    }

    form.reset();
    fetchEstudiantes();
});

// Función para editar un estudiante
window.editEstudiante = async function(id) {
    try {
        const response = await fetch(`http://localhost:5000/estudiante/${id}`);
        const estudiante = await response.json();
        Swal.fire({
            title: 'Editar estudiante',
            html: `
                <label for="nombre">Nombre:</label>
                <input id="nombre" class="swal2-input" value="${estudiante.nombre}">
                <label for="apellido">Apellido:</label>
                <input id="apellido" class="swal2-input" value="${estudiante.apellido}">
                <label for="genero">Género:</label>
                <input id="genero" class="swal2-input" value="${estudiante.genero}">
            `,
            preConfirm: () => {
                const nombre = Swal.getPopup().querySelector('#nombre').value;
                const apellido = Swal.getPopup().querySelector('#apellido').value;
                const genero = Swal.getPopup().querySelector('#genero').value;
                return { nombre, apellido, genero };
            },
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://localhost:5000/estudiante/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(result.value)
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualización exitosa',
                        text: 'El estudiante se ha actualizado correctamente.',
                    });
                    fetchEstudiantes();
                } catch (error) {
                    console.error('Error al actualizar el estudiante:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo actualizar el estudiante.',
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error al obtener el estudiante para editar:', error);
    }
};

// Función para eliminar un estudiante
window.deleteEstudiante = async function(id) {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminado, no podrás recuperar este registro!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            await fetch(`http://localhost:5000/estudiante/${id}`, {
                method: 'DELETE'
            });
            Swal.fire(
                'Eliminado!',
                'El estudiante ha sido eliminado.',
                'success'
            );
            fetchEstudiantes();
        }
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el estudiante.',
        });
    }
};

// Cargar estudiantes al iniciar
fetchEstudiantes();
