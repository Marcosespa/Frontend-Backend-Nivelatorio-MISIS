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

```sh
docker compose build
docker compose up -d

Luego, abrir el  navegador:
- Frontend: http://localhost:8000/index.html
- Backend: http://localhost:8080/

Para verificar que estan corriendo
```sh







## 🛠️ Instalación y Ejecución
1. Instalar dependencias del backend

Asegúrate de tener Python instalado. Luego, instala las dependencias del backend:

bash
Copy
pip install -r Back/requirements.txt
2. Ejecutar el backend

Para ejecutar el backend, usa el siguiente comando:

bash
Copy
python3 Back/run.py
El backend estará disponible en http://localhost:8080.

3. Ejecutar el frontend

Para ejecutar el frontend, navega a la carpeta Front/public y usa un servidor HTTP simple:

bash
Copy
cd Front/public
python3 -m http.server 8000
El frontend estará disponible en http://localhost:8000.

## Pruebas en Post Man



