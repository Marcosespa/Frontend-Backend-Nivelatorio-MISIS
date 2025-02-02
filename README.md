# 🎯 Frontend-Backend-Nivelatorio-MISIS

Este es un proyecto **Full-Stack** que combina un **backend en Flask** y un **frontend estático en HTML/CSS/JavaScript**.

---

## 🚀 Tecnologías utilizadas
- **Backend**: Python, Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-CORS
- **Frontend**: HTML, CSS, JavaScript (con Fetch API para consumir el backend)
- **Base de Datos**: SQLite (puede ser modificada a PostgreSQL o MySQL)
- **Docker**: Para ejecutar el proyecto fácilmente en cualquier máquina.

---

## 📦 Ejecutar el proyecto con Docker
Para ejecutar el proyecto completo en **Docker**, usa los siguientes comandos:
~~~
docker compose build
docker compose up -d
~~~

Luego, abrir el  navegador:

- Frontend: http://localhost:8000/index.html
- Backend: http://localhost:8080/

Para verificar que estan corriendo
~~~
docker ps
~~~

Para detener y eliminar los contenedores:
~~~
docker compose down
~~~

## Pruebas en Post Man

Base URL: http://localhost:8080

Registrar un nuevo usuario
Endpoint: POST /registro
Descripción: Crea un nuevo usuario en el sistema.
Body (JSON) Ejemplo:
~~~

{
  "nombre_usuario": "usuario1",
  "contrasena": "123456",
  "imagen_perfil": "https://example.com/avatar.png"
}
~~~

Respuesta exitosa (201 Created)
~~~

{"mensaje": "Usuario registrado"}
~~~

2️⃣ Iniciar sesión
Endpoint: POST /login
Descripción: Genera un token JWT si las credenciales son correctas.
Body (JSON) Ejemplo:
~~~

{
  "nombre_usuario": "usuario1",
  "contrasena": "123456"
}
~~~

Respuesta exitosa (200 OK)
~~~

{"access_token": "eyJhbGciOiJIUzI1..."}
~~~

Error (401 Unauthorized)
~~~

{"mensaje": "Credenciales inválidas"}
~~~
3️⃣ Obtener el usuario autenticado
Endpoint: GET /usuarios/me
Descripción: Devuelve los datos del usuario autenticado.
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta exitosa (200 OK)
~~~
{
  "id": 1,
  "nombre_usuario": "usuario1",
  "imagen_perfil": "https://example.com/avatar.png"
}
~~~

4️⃣ Cerrar sesión
Endpoint: POST /logout
Descripción: Invalida el token actual (pero no realiza un logout real en el servidor).
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta (200 OK)
~~~
{"mensaje": "Sesión cerrada"}
~~~

📂 Gestión de Categorías (/categorias)

5️⃣ Crear una categoría
Endpoint: POST /categorias
Descripción: Crea una nueva categoría de tareas.
~~~
Headers:
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Body (JSON) Ejemplo:
~~~
{
  "nombre": "Trabajo",
  "descripcion": "Tareas laborales"
}
~~~

Respuesta (201 Created)
~~~
{"mensaje": "Categoría creada"}
~~~

6️⃣ Obtener todas las categorías
Endpoint: GET /categorias
Descripción: Devuelve la lista de todas las categorías.
~~~
Headers:
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta (200 OK)
~~~
[
  {"id": 1, "nombre": "Trabajo", "descripcion": "Tareas laborales"},
  {"id": 2, "nombre": "Personal", "descripcion": "Tareas personales"}
]
~~~

7️⃣ Actualizar una categoría
Endpoint: PUT /categorias/{categoria_id}
Descripción: Modifica una categoría existente.
~~~
Headers:
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Body (JSON) Ejemplo:
~~~
{
  "nombre": "Universidad",
  "descripcion": "Tareas de la universidad"
}
~~~

Respuesta (200 OK)
~~~
{"mensaje": "Categoría actualizada"}
~~~

8️⃣ Eliminar una categoría
Endpoint: DELETE /categorias/{categoria_id}
Descripción: Elimina una categoría por su ID.
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta (200 OK)
~~~
{"mensaje": "Categoría eliminada"}
~~~

📝 Gestión de Tareas (/tareas)

9️⃣ Obtener todas las tareas de un usuario
Endpoint: GET /usuarios/{usuario_id}/tareas
Descripción: Obtiene todas las tareas de un usuario específico.
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta (200 OK)
~~~
[
  {
    "id": 1,
    "texto_tarea": "Estudiar para el examen",
    "fecha_creacion": "2024-02-02",
    "estado": "Pendiente"
  }
]
~~~

🔟 Crear una nueva tarea
Endpoint: POST /tareas
Descripción: Crea una nueva tarea para el usuario autenticado.
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Body (JSON) Ejemplo:
~~~
{
  "texto_tarea": "Comprar libros",
  "fecha_creacion": "2024-02-05",
  "estado": "Pendiente",
  "id_categoria": 1
}
~~~

Respuesta (201 Created)
~~~
{"mensaje": "Tarea creada"}
~~~

🔢 Obtener una tarea por su ID
Endpoint: GET /tareas/{tarea_id}
Descripción: Devuelve la información de una tarea específica.
~~~
Headers:
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta (200 OK)
~~~
{
  "id": 1,
  "texto_tarea": "Comprar libros",
  "fecha_creacion": "2024-02-05",
  "estado": "Pendiente"
}
~~~

🔢 Actualizar una tarea
Endpoint: PUT /tareas/{tarea_id}
Descripción: Modifica una tarea existente.
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Body (JSON) Ejemplo:
~~~
{
  "texto_tarea": "Comprar más libros",
  "estado": "En progreso"
}
~~~

Respuesta (200 OK)
~~~
{"mensaje": "Tarea actualizada"}
~~~

🔢 Eliminar una tarea
Endpoint: DELETE /tareas/{tarea_id}
Descripción: Elimina una tarea específica.
Headers:
~~~
{
  "Authorization": "Bearer <TOKEN>"
}
~~~

Respuesta (200 OK)
~~~
{"mensaje": "Tarea eliminada"}
~~~








