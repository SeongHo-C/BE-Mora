const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'More API',
    description: 'More API with express',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./api/admin/router.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
