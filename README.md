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

```
├── src
│   ├── config/           # Configuración de Sequelize y entorno
│   ├── controllers/      # Lógica de endpoints
│   ├── middlewares/      # Validaciones, sanitización, errores
│   ├── models/           # Modelos Sequelize
│   ├── routes/           # Definición de rutas
│   ├── services/         # Lógica de negocio
│   ├── utils/            # Funciones reutilizables
│   ├── app.js            # App Express
│   └── server.js         # Servidor principal
├── tests/                # Pruebas automatizadas
├── .env.example          # Variables de entorno (referencia)
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio:**

```bash
git clone https://github.com/Crisolser/api-productos.git
cd api-productos
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura las variables de entorno:**

Copia `.env.example` y nómbralo como `.env`. Luego completa tus valores locales:

```env
PORT=3000
DB_NAME=productos_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
```

4. **Ejecuta migraciones/sincronización (opcional):**

El archivo `src/models/index.js` sincroniza los modelos automáticamente con:

```js
await sequelize.sync({ alter: true });
```

---

## 🚀 Scripts disponibles

| Comando         | Descripción                            |
|----------------|----------------------------------------|
| `npm run dev`  | Ejecuta en desarrollo con nodemon       |
| `npm start`    | Ejecuta en producción                   |
| `npm test`     | Ejecuta las pruebas con Jest + Supertest|

---

## 🧪 Pruebas

Para ejecutar pruebas automatizadas:

```bash
npm test
```

Las pruebas se encuentran dentro de la carpeta `/tests` y validan diferentes escenarios de creación de productos.

---

## 🔌 Endpoints principales

| Método | Endpoint         | Descripción                       |
|--------|------------------|-----------------------------------|
| POST   | `/product`       | Crea un nuevo producto            |
| GET    | `/product/:id`   | Obtiene un producto por ID        |
| GET    | `/products`      | Lista productos con filtros       |
| PUT    | `/product/:id`   | Actualiza un producto             |
| DELETE | `/product/:id`   | Elimina un producto (soft delete) |

---

## 🧰 Middlewares incluidos

- Validación de parámetros obligatorios
- Exclusión de parámetros inválidos
- Validaciones de tipo (`string`, `number`, etc.)
- Mensajes de error personalizados

---

## 🐳 Docker (opcional)

Si deseas levantar la API en Docker, asegúrate de tener tu `Dockerfile` y `docker-compose.yml` (no incluido por defecto). Luego puedes correr:

```bash
docker-compose up
```

---

## 🧑‍💻 Autor

**Cris Olser**  
GitHub: [@Crisolser](https://github.com/Crisolser)

---

## 📄 Licencia

MIT License - feel free to use and adapt.
