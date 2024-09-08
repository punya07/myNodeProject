const swaggerJSDoc = require('swagger-jsdoc');
const { config } = require('./swagger.config.js');
const path = require('path');

const host  ='localhost';
const PORT   =  7000;

const swaggerOptions = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "PunyaNode_Swagger",
        description: "This is a server for Testing and Production",
        version: "1.0.0"
      },
      host:host+':'+PORT,
      components: {
        securitySchemes: {
          Authorization: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            value: "Bearer <JWT token here>"
          }
        }
      }
    },
    servers: [{ url: "http://localhost:7000/" }],
    apis: ["./docs/**/*.yaml"],
    
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  module.exports = swaggerDocs;