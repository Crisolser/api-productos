# API de Gestión de Productos

API REST para la gestión de productos y órdenes, desarrollada con Node.js y Express.

## 🚀 Características

- CRUD completo de productos
- Gestión de compañías
- Gestión de órdenes
- Validación de datos
- Búsqueda por filtros
- Paginación
- Control de duplicados por código de barras
- Base de datos PostgreSQL con Sequelize ORM

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd api-productos
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

### Testing
```bash
npm test
```

## 📚 Documentación de la API

### Productos

#### Obtener todos los productos
```http
GET /product
```
Query Parameters:
- `limit`: Número de productos por página (default: 10)
- `page`: Número de página (default: 1)
- `name`: Filtrar por nombre
- `barcode`: Filtrar por código de barras
- `company_id`: Filtrar por compañía
- `unit_id`: Filtrar por unidad

#### Obtener un producto
```http
GET /product/:id
```

#### Crear producto
```http
POST /product
```
Body:
```json
{
    "name": "string",
    "description": "string",
    "company_id": number,
    "price": number,
    "cost": number,
    "unit_id": number,
    "barcode": "string"
}
```

#### Actualizar producto
```http
PUT /product/:id
```
Body: Mismos campos que en la creación

#### Eliminar producto
```http
DELETE /product/:id
```

## 📁 Estructura del Proyecto

api-productos/
├── src/
│   ├── config/                 # Configuraciones
│   │   ├── database.js        # Configuración de base de datos
│   │   ├── express.js         # Configuración de Express
│   │   └── environment.js     # Variables de entorno
│   │
│   ├── core/                  # Núcleo de la aplicación
│   │   ├── app.js            # Aplicación Express
│   │   └── server.js         # Servidor HTTP
│   │
│   ├── database/             # Base de datos
│   │   ├── migrations/       # Migraciones
│   │   ├── seeders/         # Datos iniciales
│   │   └── models/          # Modelos Sequelize
│   │       ├── index.js
│   │       ├── product.model.js
│   │       ├── company.model.js
│   │       ├── order.model.js
│   │       └── product-unit.model.js
│   │
│   ├── modules/              # Módulos de la aplicación
│   │   ├── products/        # Módulo de productos
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── validators/
│   │   │   └── routes/
│   │   │
│   │   ├── companies/       # Módulo de compañías
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── validators/
│   │   │   └── routes/
│   │   │
│   │   └── orders/         # Módulo de órdenes
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── repositories/
│   │       ├── validators/
│   │       └── routes/
│   │
│   ├── shared/              # Código compartido
│   │   ├── constants/      # Constantes
│   │   ├── errors/        # Errores personalizados
│   │   ├── interfaces/    # Interfaces/Types
│   │   ├── middlewares/   # Middlewares
│   │   └── utils/         # Utilidades
│   │
│   ├── jobs/              # Tareas programadas
│   │   └── show-time.js
│   │
│   └── tests/             # Pruebas
│       ├── unit/         # Pruebas unitarias
│       ├── integration/  # Pruebas de integración
│       └── e2e/         # Pruebas end-to-end
│
├── docs/                  # Documentación
│   ├── api/              # Documentación de API
│   └── architecture/     # Documentación de arquitectura
│
├── scripts/              # Scripts útiles
│   ├── setup.sh
│   └── deploy.sh
│
├── .env                  # Variables de entorno
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore
├── .eslintrc.js        # Configuración de ESLint
├── .prettierrc         # Configuración de Prettier
├── jest.config.js      # Configuración de Jest
├── package.json
├── README.md
└── LICENSE

## 🛠 Tecnologías Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
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