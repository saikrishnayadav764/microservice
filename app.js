require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const sequelize = require('./config/database');
const swagger = require('./swagger');

// Integrating Swagger documentation
swagger(app);

// Middleware
app.use(express.json());



// Routes
app.use('/auth', authRoutes);
app.use('/assignments', assignmentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Testing database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
