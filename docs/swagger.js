const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API - Sistema Policial',
    version: '1.0.0',
    description: 'Documentação da API de gerenciamento de agentes e casos policiais.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['routes/*.js'], // Caminho dos arquivos com anotações
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
