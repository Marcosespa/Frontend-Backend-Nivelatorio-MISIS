# Frontend-Backend-Nivelatorio-MISIS

Este es un proyecto Full-Stack que combina un **backend en Flask** y un **frontend estático en HTML/CSS/JavaScript**.

## 🚀 Tecnologías utilizadas
- **Backend**: Python, Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-CORS
- **Frontend**: HTML, CSS, JavaScript (con Fetch API para consumir el backend)
- **Base de Datos**: SQLite (puede ser modificada a PostgreSQL o MySQL)

---

## 📂 Estructura del Proyecto
Completo/ │── Back/ # Backend en Flask │ │── app/ # Código del backend │ │── flask_env/ # Entorno virtual (si aplica) │ │── requirements.txt # Dependencias del backend │ │── run.py # Archivo principal del backend │ │── Front/ # Frontend estático │ │── public/ # Archivos HTML, CSS y JS │ │── index.html # Página principal │ │── tareas.html # Página de tareas │ │── src/ # Código JS y CSS │ │── README.md # Documentación del proyecto


## Para ejecutar el backend asegurate de hacer instalado las dependencias:
python3 run.py 


## Para ejecutar el frontedn parate dentro de la carpeta public:
python3 -m http.server 8000
