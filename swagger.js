const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
  info: {
    title: 'mora API Document',
    version: '0.0.1',
    description: '모여라 레이서 swagger 입니다.',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access these api endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: 'localhost:3000',
      description: 'Local server',
    },
  ],
};
const outputFile = './swagger-output.json';
const endpointsFiles = [
  './api/admin/router.js',
  './api/notice/router.js',
  './api/board/router.js',
  './api/generation/router.js',
  './api/report/router.js',
  './api/plan/router.js',
];
swaggerAutogen(outputFile, endpointsFiles, options);
