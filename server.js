const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { initDb } = require('./utils/db');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Middleware
app.use(bodyParser.json());

// Routes
const routes = require('./routes/index');
app.use('/', routes);

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'CSE341 Contacts API documentation',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' },
      { url: 'https://cse341-2q99.onrender.com', description: 'Production' },
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'john.doe@example.com',
            },
            favoriteColor: {
              type: 'string',
              example: 'Blue',
            },
            birthday: {
              type: 'string',
              example: '1990-05-14',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/**/*.js', './controllers/**/*.js', './server.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Start server
initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});



