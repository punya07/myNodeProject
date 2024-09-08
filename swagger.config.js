// swagger.config.js
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');


// const dirname = path.dirname(require.main.filename);

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "PunyaNode_Swagger",
      description: "This is a server for Testing and Production",
      version: "1.0.0",
    },
  },
  servers: [{ url: "http://localhost:7000/" }],
  apis: ["./index.js"], 

  
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
