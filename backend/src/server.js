require('dotenv').config();
const express = require('express');
const register = require('./routes/Register');
const login = require('./routes/Login');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('./routes/users');
const authMiddleware = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// ✅ Initialize app first
const app = express();
app.use(express.json());


const cors = require('cors');
app.use(cors());


const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scalable API Documentation',
      version: '1.0.0',
      description: 'API documentation for authentication and CRUD operations'
    },
    servers: [
      { url: 'http://localhost:5000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
});




// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Routes
app.post('/api/v1/register', register);
app.post('/api/v1/login', login);

// CRUD Routes (protected with JWT middleware)
app.post('/api/v1/users', authMiddleware, createUser);
app.get('/api/v1/users', authMiddleware, getUsers);
app.get('/api/v1/users/:id', authMiddleware, getUserById);
app.put('/api/v1/users/:id', authMiddleware, updateUser);
app.delete('/api/v1/users/:id', authMiddleware, deleteUser);

// Protected route
app.get('/api/v1/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authenticated!` });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Debugging
console.log('Register type:', typeof register);
console.log('Login type:', typeof login);