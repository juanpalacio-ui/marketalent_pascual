# Marketalent Pascual

Marketalent Pascual es una plataforma web moderna con un **Backend en FastAPI** y un **Frontend en React + Vite**.
En este documento encontrarás las instrucciones para levantar el proyecto en tu entorno local de desarrollo, ya sea utilizando Docker (recomendado) o de forma manual.

---

## 🚀 Opción 1: Ejecutar con Docker (Recomendado)

La forma más sencilla de levantar todo el proyecto (Base de Datos, Backend y Frontend) es a través de Docker Compose.

**Requisitos previos:**
- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

**Pasos:**
1. En la raíz del proyecto (donde se encuentra `docker-compose.yml`), ejecuta:
   ```bash
   docker-compose up --build
   ```
2. ¡Listo! Los servicios estarán disponibles en:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:8000](http://localhost:8000)
   - **Documentación de la API (Swagger)**: [http://localhost:8000/](http://localhost:8000/)

> *Para detener los contenedores, usa `Ctrl+C` y luego ejecuta `docker-compose down` para limpiar la red y los contenedores detenidos.*

---

## 💻 Opción 2: Ejecutar sin Docker (Desarrollo Manual)

Si prefieres ejecutar los servicios directamente en tu máquina host, deberás levantar el backend y el frontend por separado, además de tener una instancia de PostgreSQL en ejecución.

### 2.1. Configuración de la Base de Datos
Debes tener **PostgreSQL** corriendo en tu máquina (o en un contenedor separado) y crear una base de datos.
Por defecto, la aplicación buscará la conexión que debes definir en la variable de entorno `DATABASE_URL`.

Por ejemplo:
`export DATABASE_URL="postgresql+pg8000://usuario:contraseña@localhost:5432/marketalent"`

### 2.2. Levantar el Backend (FastAPI)

**Requisitos previos:**
- Python 3.10+
- Servidor PostgreSQL local.

**Pasos:**
1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Crea y activa un entorno virtual:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
> El backend estará disponible en [http://localhost:8000](http://localhost:8000).

### 2.3. Levantar el Frontend (React + Vite)

**Requisitos previos:**
- Node.js (v18 o superior).

**Pasos:**
1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
> El frontend estará disponible en [http://localhost:5173](http://localhost:5173).

---

Para más detalles sobre la arquitectura y la estructura de los directorios, revisa el archivo `DOCUMENTATION.md` generado en la raíz del proyecto.
