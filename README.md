# API de Gestión de Productos

API REST para la gestión de productos y órdenes, desarrollada con Node.js y Express.

## 🚀 Características

- CRUD completo de productos
- Validación de datos
- Búsqueda por filtros
- Paginación
- Control de duplicados por código de barras
- Base de datos PostgreSQL con Sequelize ORM

## 📋 Prerrequisitos

- Docker
- Docker Compose
- Node.js (v22.16.0 o superior) - Solo para desarrollo local

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone git@github.com:Crisolser/api-productos.git
cd api-productos
```

2. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=4001
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
```

## 🚀 Uso con Docker

### Levantar la aplicación completa (API + Base de datos)
```bash
docker-compose up --build
```

### Detener la aplicación
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f
```

### Reiniciar servicios
```bash
docker-compose restart
```

## 📚 Documentación de la API

La documentación completa de la API está disponible a través de Swagger UI:

- URL: `http://localhost:4001/api-docs`
- Incluye:
  - Descripción de todos los endpoints
  - Parámetros requeridos
  - Formatos de respuesta
  - Ejemplos de uso
  - Interfaz interactiva para probar endpoints

## 📁 Estructura del Proyecto

```
api-productos/
├── api/                    # Carpeta de la aplicación
│   ├── src/
│   │   ├── config/        # Configuraciones
│   │   ├── database/      # Configuración de base de datos
│   │   ├── helpers/       # Utilidades y funciones auxiliares
│   │   ├── jobs/         # Tareas programadas
│   │   ├── models/       # Modelos de Sequelize
│   │   ├── modules/      # Módulos de la aplicación
│   │   │   └── products/        # Módulo de productos
│   │   │       ├── controllers/ # Controladores de productos
│   │   │       ├── services/    # Servicios de productos
│   │   │       ├── repositories/# Repositorios de productos
│   │   │       ├── validators/  # Validadores de productos
│   │   │       └── routes/      # Rutas de productos
│   │   │
│   │   ├── repository/   # Capa de acceso a datos
│   │   ├── test/        # Pruebas unitarias
│   │   ├── app.js       # Configuración de Express
│   │   ├── index.js     # Punto de entrada
│   │   ├── all.routes.js # Rutas principales
│   │   └── syncDB.js    # Sincronización de base de datos
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
└── README.md
```

## 🛠 Tecnologías Utilizadas

- Node.js 22.16.0
- Express
- PostgreSQL
- Sequelize
- Docker
- Swagger UI
- Jest
- Supertest
- Morgan
- CORS
- Dotenv

## 📝 Modelos de Datos

### Product
```javascript
{
    product_id: Integer,
    name: String,
    description: String,
    company_id: Integer,
    price: Decimal,
    cost: Decimal,
    unit_id: Integer,
    barcode: String,
    status: Integer
}
```

### Company
```javascript
{
    company_id: Integer,
    name: String,
    contact_person: String,
    contact_phone: String,
    rfc: String
}
```

### Order
```javascript
{
    order_id: Integer,
    created_datetime: DateTime
}
```

### OrderItem
```javascript
{
    order_item_id: Integer,
    order_id: Integer,
    product_id: Integer
}
```

### ProductUnit
```javascript
{
    product_unit_id: Integer,
    name: String
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Autor

Cristian Olmedo Serrano

## 📞 Soporte

Para soporte, por favor abrir un issue en el repositorio.