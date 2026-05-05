# Documentación del Proyecto: Marketalent Pascual

Este documento detalla la arquitectura, tecnologías y estructura del proyecto **Marketalent Pascual**, el cual está dividido en dos partes principales: un **Backend** (FastAPI) y un **Frontend** (React + Vite).

---

## 1. Arquitectura General y Despliegue

El proyecto utiliza **Docker** y **Docker Compose** para orquestar sus servicios de forma aislada y reproducible.

*   **Servicios en `docker-compose.yml`**:
    *   `db`: Base de datos PostgreSQL (versión 15).
    *   `backend`: API REST en FastAPI expuesta en el puerto `8000`.
    *   `frontend`: Aplicación web React expuesta en el puerto `5173`.
*   **Variables de entorno principales**:
    *   `DATABASE_URL`: `postgresql+pg8000://myuser:mypassword@db:5432/marketalent` (para la conexión de la app backend hacia la base de datos).

---

## 2. Backend

El backend es una API RESTful moderna, robusta y asíncrona, construida en Python.

### 2.1. Stack Tecnológico
*   **Framework Web**: [FastAPI](https://fastapi.tiangolo.com/) (servido con Uvicorn).
*   **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/).
*   **Driver DB**: `pg8000` (Driver de PostgreSQL puro de Python).
*   **Validación de Datos**: Pydantic (con soporte para emails).
*   **Testing**: Pytest y HTTPX.
*   **Gestión de Configuración**: Pydantic Settings.

### 2.2. Arquitectura de Software
El código del backend sigue principios de **Clean Architecture / Domain-Driven Design (DDD)** estructurado en los siguientes módulos dentro de `backend/app/`:

*   **`api/`**: Contiene los enrutadores (routers) y la definición de los endpoints. Está versionado (`v1`).
*   **`core/`**: Configuraciones generales (ej. variables de entorno en `settings`, conexión a base de datos `database.py`).
*   **`models/`**: Entidades de la base de datos (modelos SQLAlchemy).
*   **`repositories/`**: Abstracción de acceso a datos (Repository Pattern). Separa la lógica de base de datos de la lógica de negocio.
*   **`schemas/`**: Modelos Pydantic para la validación de datos de entrada/salida de la API.
*   **`services/`**: Contiene la lógica de negocio. Interactúa con los repositorios y es consumido por los endpoints.

### 2.3. Modelos y Entidades
Actualmente cuenta con la entidad **User**:
*   `id`: Integer (Primary Key).
*   `username`: String (Único).
*   `email`: String (Único).
*   `hashed_password`: String.

### 2.4. Endpoints (API v1)
Los endpoints se exponen bajo el prefijo `/api/v1/users`.

| Método | Endpoint | Descripción | Request Body (Schema) | Response (Schema) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/` | Crea un nuevo usuario en la DB | `UserCreate` (username, email, password) | `UserResponse` (id, username, email) |
| `GET` | `/api/v1/users/{user_id}` | Obtiene la información de un usuario | Path Param: `user_id` | `UserResponse` (id, username, email) |

### 2.5. CORS
El backend está configurado para aceptar peticiones Cross-Origin (CORS) desde el frontend en desarrollo (`http://localhost:5173` y `http://127.0.0.1:5173`).

---

## 3. Frontend

El frontend es una aplicación web dinámica orientada a la gestión y edición de proyectos de tesis.

### 3.1. Stack Tecnológico
*   **Librería Principal**: React 19.
*   **Lenguaje**: TypeScript.
*   **Build Tool**: Vite (rápido y optimizado).
*   **Estilos**: Tailwind CSS v4.
*   **Iconos**: Lucide React.
*   **Animaciones**: Motion.
*   **Peticiones HTTP**: Axios.
*   **Renderizado Markdown**: `react-markdown` y `remark-gfm`.

### 3.2. Arquitectura de Software
Se basa en el patrón de **Componentes Contenedores vs. Presentacionales (Container-Presenter Pattern)**, lo que facilita la escalabilidad y las pruebas:

*   **`containers/`**: Contienen la lógica de negocio, manejo de estados asíncronos y consumo de hooks (ej. `ThesisContainer.tsx`).
*   **`components/`**: Componentes puramente visuales o presentacionales (ej. `ThesisPresenter.tsx`), reciben datos a través de `props`.
*   **`hooks/`**: Lógica reactiva reutilizable (ej. `useThesis`).
*   **`services/`**: Integración con las APIs del Backend usando Axios.
*   **`types/`**: Definiciones de interfaces estáticas de TypeScript para asegurar el tipado de los datos.

### 3.3. Funcionalidad Principal: Editor de Tesis (`ThesisEditor`)
El enfoque primario actual del frontend es un Editor de Tesis interactivo.

**Manejo de Tipos (`types/thesis.ts`)**:
*   `Thesis`: Compuesta por un `id`, `title`, un array de `sections` (secciones) y una fecha `updatedAt`.
*   `ThesisSection`: Cada sección tiene un `id`, `title`, `placeholder` (instrucciones para el usuario), y un `content` (el texto que el usuario edita).

**Flujo de Componentes**:
1.  **`App.tsx`**: Renderiza el layout principal montando `ThesisContainer`.
2.  **`ThesisContainer.tsx`**: Consume el hook `useThesis` para cargar la tesis desde el backend (o servicio local), maneja estados de *loading* (cargando) y *error* (pantallas de fallback).
3.  **`ThesisPresenter.tsx`**: Renderiza la vista final para el usuario donde se pueden visualizar o editar las secciones y finalmente invoca la función de guardar (`onSave`).
