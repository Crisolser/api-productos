# PREGUNTAS TEÓRICAS

**CONTEXTO:** Devido a que el proyecto lo desarrollé utilizando javascript, node js y express, responderé las preguntas desde mi consimiento en estas tecnologías. 

### 1. ¿Cuál es la diferencia entre particionar una tabla por hash o por range en PostgreSQL y cuándo conviene elegir una u otra?

- **Hash:** Se utiliza para datos que no tienen una forma o estructura sequencial, algunos ejemplos podrían ser UUID o IDs randoms, la partición por este método asigna un número estructurado a cada registro y se van insertando de forma aleatorea en distintas particiones.
- **Range:** Caso contrario al anterior este se utiliza para datos con estructuras definidas como IDs autoincrementales o fechas.

### 2. ¿Qué ventajas ofrece el versionado de APIs mediante headers frente al versionado por URI en un backend construido con FastAPI, y cómo se implementa cada uno?

Permite tener URIs más limpias, mantiene el consepto de RESTFull API, permite desactivar versiones viejas de una forma más sencilla que en URI, se pueden tener las mismas rutas y solo modificar lógica del service según versión desde el controller. 

IMPLEMENTACIÓN VERCIÓN POR HEADERS

```js
// Un solo endpoint para todas las versiones
app.get('/users', (req, res) => {
  const version = req.get('X-API-Version') || 'v1';
  
  if (version === 'v1') return res.json({ data: 'Formato antiguo' });
  if (version === 'v2') return res.json({ data: 'Formato nuevo' });
  // v3 se añade aquí sin crear una ruta nueva
});
```

IMPLEMENTACIÓN VERSIÓN POR URI
```js
// Versiones separadas en rutas
app.get('/v1/users', handleV1Users);
app.get('/v2/users', handleV2Users);

// También se pueden usar routers modulares
import v1Router from './routes/v1/users.js';
import v2Router from './routes/v2/users.js';

app.use('/v1', v1Router);
app.use('/v2', v2Router);
```

Como dato adicional en mi experiencia cuando se trabaja con versiones nuevas de una API se realiza en un proyecto adicional en github y el versionamiento se gestiona desde un proxy inverso (NGINX), esto permite tener multiples versiones en un solo servidor o de ser necesario desacoplar verciones (proyectos) en un servidor aparte desplegando solo la versión que nos interesa.

### 3. ¿Qué es el patrón Repository y cómo ayuda a desacoplar la lógica de negocio del acceso a datos cuando usas FastAPI y SQLAlchemy?

En mi experiencia trabajando en arquitectura por capas, el patrón repository ayuda a encapsular la interacción con la base de datos sin tener que involucrar lógica adicional como validaciones, reglas de negocio, o transformación de datos. 

Si en algún momento se necesita cambiar de base de datos o de ORM solo se modifica esta capa.  

### 4. ¿En qué se diferencian las estrategias rolling update y recreate al actualizar servicios en Docker Compose?

**Rolling Update:** Realiza apagado y levantamiento gradual de nuevos contenedores de forma gradual, permitiendo que en en algún punto de la implementación se tenga temporalmente 2 versiones en ejecución, recomendable para implementaciones en horarios de alta demanda.

**Recreate:** Detiene los contenedores y posteriormente los vuelve a levantar, esto puede afectar la disponibilidad de los sistemas durante segundos o minutos, recomendable en ventanas nocturnas o donde hay poca afluencia de trafico. 

### 5. ¿Cómo puedes prevenir ataques de SQL injection y mass assignment en una API hecha con FastAPI y SQLAlchemy, y qué medidas específicas debe implementar tu ORM?

En mi caso utilizando express y sequelize(ORM)

Lo principal para evitar SQL injection es que si se hacen consultas directas (sin ORM) para lógicas o peticiones completjas, nunca sustituir datos directamente en el string de la petición.

❌ Ejemplo 

```js
const email = "cristianolser11@gmail.com"
sequelize.query(`SELECT * FROM Users WHERE email = "${email}"`)
```

En su lugar aprovechar todas las herramientas que provee sequelize para evitar esto como usando los métodos nativos donde ya se aplica esta protección o queries parametrizadas desde sequelize.

Ejemplo 

```js
const email = "cristianolser11@gmail.com"
sequelize.query("SELECT * FROM Users WHERE email = ?",{
    replacements:[email]
})
```

Para Mass Assigment se puede pueden aplicar varias estrategias, respndiendo a la pregunta, desde la consulta en el orm se puede pasar un boy con multiples parámetros pero se puede especificar cuales son los que se deben considerar para la acción. 

```js
User.create({
  name: "Cristian",
  email: "cristianolser11@gmail.com",
  role: "admin" 
}, { fields: ['name', 'email'] }); //se ignora el parámetro role 
```

Otras estrategias es sanitisar el body antes enviarlo al repository aunque una estrategia doble aumenta la seguridad. 

En mi caso por buenas prácticas decido implementar un validator para analizar solo los parámetros aceptados en el body, query o parameters de la petición.
