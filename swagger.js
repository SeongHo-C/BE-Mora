const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Mora API',
    description: 'Mora API with express',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './api/admin/router.js',
  './api/notice/router.js',
  './api/board/router.js',
  './api/generation/router.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
