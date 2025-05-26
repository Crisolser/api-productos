import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Productos',
      version: '1.0.0',
      description: 'API REST para la gestión de productos y órdenes',
      contact: {
        name: 'Cristian Olmedo Serrano'
      }
    },
    servers: [
      {
        url: 'http://localhost:4001',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'company_id', 'price', 'barcode'],
          properties: {
            product_id: {
              type: 'integer',
              description: 'ID del producto'
            },
            name: {
              type: 'string',
              description: 'Nombre del producto'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto'
            },
            company_id: {
              type: 'integer',
              description: 'ID de la compañía'
            },
            price: {
              type: 'number',
              description: 'Precio del producto'
            },
            cost: {
              type: 'number',
              description: 'Costo del producto'
            },
            unit_id: {
              type: 'integer',
              description: 'ID de la unidad'
            },
            barcode: {
              type: 'string',
              description: 'Código de barras'
            },
            status: {
              type: 'integer',
              description: 'Estado del producto'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.js'], // Ruta a los archivos con anotaciones
};

export const specs = swaggerJsdoc(options);