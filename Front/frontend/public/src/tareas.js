document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/index.html';
    }

    const formTarea = document.getElementById('form-tarea');
    const formCategoria = document.getElementById('form-categoria');
    const listaTareas = document.getElementById('lista-tareas');
    const listaCategorias = document.getElementById('lista-categorias');
    const selectCategoria = document.getElementById('categoria');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const nombreUsuario = document.getElementById('nombre-usuario');
    let usuarioId = null; 
    
    obtenerUsuarioLoggeado();

    cargarTareas();
    cargarCategorias();

    if (formTarea) {
        formTarea.addEventListener('submit', function (event) {
            event.preventDefault();
            const texto = document.getElementById('texto-tarea').value;
            const fechaCreacion = document.getElementById('fecha-creacion').value;
            const fechaTentativaFinalizacion = document.getElementById('fecha-tentativa-finalizacion').value;
            const estado = document.getElementById('estado').value;
            const categoriaId = document.getElementById('categoria').value;

            crearTarea(texto, fechaCreacion, fechaTentativaFinalizacion, estado, categoriaId);
        });
    }

    if (formCategoria) {
        formCategoria.addEventListener('submit', function (event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre-categoria').value;
            const descripcion = document.getElementById('descripcion-categoria').value;

            crearCategoria(nombre, descripcion);
        });
    }

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', function () {
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        });
    }

    function obtenerUsuarioLoggeado() {
        fetch('http://localhost:8080/usuarios/me', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(usuario => {
            nombreUsuario.textContent = usuario.nombre_usuario;
            usuarioId=usuario.id;
            previo=textContent=usuario.imagen_perfil;
            const fotoPerfil = document.getElementById('fotoPerfil');

       // Verifica si la URL de la imagen está vacía o es null
            if (!usuario.imagen_perfil || usuario.imagen_perfil.trim() === "") {
                fotoPerfil.src = "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png";  
                fotoPerfil.style.display = "block";                    
            } else {
                fotoPerfil.src = usuario.imagen_perfil; 
                fotoPerfil.style.display = "block";  
            }
            console.log("Usuario autenticado con ID:", usuarioId); 
            cargarTareas();
        })
        .catch(error => console.error('Error:', error));
    }

    function cargarTareas() {
        if (!usuarioId) {
            console.error("Usuario no identificado aún. Esperando ID...");
            return; 
        }
    
        fetch(`http://localhost:8080/usuarios/${usuarioId}/tareas`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(tareas => {
            listaTareas.innerHTML = '';
            tareas.forEach(tarea => {
                const li = document.createElement('li');
                li.textContent = `${tarea.texto_tarea} (${tarea.fecha_creacion}) - Estado: ${tarea.estado}`;
    
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.addEventListener('click', () => editarTarea(tarea.id));
                li.appendChild(btnEditar);
    
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));
                li.appendChild(btnEliminar);
    
                listaTareas.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    }
    

    function cargarCategorias() {
        fetch('http://localhost:8080/categorias', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(categorias => {
            listaCategorias.innerHTML = '';
            selectCategoria.innerHTML = '<option value="" disabled selected>Selecciona una categoría</option>';
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                selectCategoria.appendChild(option);

                const li = document.createElement('li');
                li.textContent = `${categoria.nombre} - ${categoria.descripcion}`;
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.addEventListener('click', () => editarCategoria(categoria.id));
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.addEventListener('click', () => eliminarCategoria(categoria.id));
                li.appendChild(btnEditar);
                li.appendChild(btnEliminar);
                listaCategorias.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    function crearTarea(texto, fechaCreacion, fechaTentativaFinalizacion, estado, categoriaId) {
        fetch('http://localhost:8080/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                texto_tarea: texto,
                fecha_creacion: fechaCreacion,
                fecha_tentativa_finalizacion: fechaTentativaFinalizacion,
                estado: estado,
                id_categoria: categoriaId,
                id_usuario: usuarioId
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Tarea creada:', data);
            cargarTareas();
        })
        .catch(error => console.error('Error:', error));
    }

    function editarTarea(id) {
        const nuevoTexto = prompt('Ingresa el nuevo texto de la tarea:');
        const nuevoEstado = prompt('Ingresa el nuevo estado (Pendiente, En progreso, Finalizada):');

        if (nuevoTexto && nuevoEstado) {
            fetch(`http://localhost:8080/tareas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    texto_tarea: nuevoTexto,
                    estado: nuevoEstado
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Tarea actualizada:', data);
                cargarTareas();
            })
            .catch(error => console.error('Error:', error));
        }
    }

    function eliminarTarea(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            fetch(`http://localhost:8080/tareas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Tarea eliminada:', data);
                cargarTareas();
            })
            .catch(error => console.error('Error:', error));
        }
    }

    function crearCategoria(nombre, descripcion) {
        fetch('http://localhost:8080/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Categoría creada:', data);
            cargarCategorias();
        })
        .catch(error => console.error('Error:', error));
    }

    function editarCategoria(id) {
        const nuevoNombre = prompt('Ingresa el nuevo nombre de la categoría:');
        const nuevaDescripcion = prompt('Ingresa la nueva descripción de la categoría:');

        if (nuevoNombre && nuevaDescripcion) {
            fetch(`http://localhost:8080/categorias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    nombre: nuevoNombre,
                    descripcion: nuevaDescripcion
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Categoría actualizada:', data);
                cargarCategorias();
            })
            .catch(error => console.error('Error:', error));
        }
    }

    function eliminarCategoria(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`http://localhost:8080/categorias/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Categoría eliminada:', data);
                cargarCategorias();
            })
            .catch(error => console.error('Error:', error));
        }
    }
});