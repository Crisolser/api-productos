# 🧃 API Productos

**API RESTful construida con Express, Sequelize y PostgreSQL** para la gestión de productos, incluyendo validaciones, paginación, control de errores, arquitectura por capas y pruebas con Jest + Supertest.

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **Sequelize ORM**
- **PostgreSQL**
- **Arquitectura por capas**
- **Jest + Supertest** para pruebas
- **Dotenv** para variables de entorno
- **Docker (opcional)**

---

## 📁 Estructura del proyecto
├── src
│ ├── config/ # Configuración de Sequelize y entorno
│ ├── controllers/ # Lógica de endpoints
│ ├── middlewares/ # Validaciones, sanitización, errores
│ ├── models/ # Modelos Sequelize
│ ├── routes/ # Definición de rutas
│ ├── services/ # Lógica de negocio
│ ├── utils/ # Funciones reutilizables
│ ├── app.js # App Express
│ └── server.js # Servidor principal
├── tests/ # Pruebas automatizadas
├── .env.example # Variables de entorno (referencia)
├── .gitignore
├── Dockerfile
├── package.json
└── README.md

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio:**

```bash
git clone https://github.com/Crisolser/api-productos.git
cd api-productos
