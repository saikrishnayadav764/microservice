# Microservice Project 

## Introduction

This microservice project aims to provide a robust solution for managing assignments in an educational setting. It offers functionalities for creating, updating, and grading assignments, along with user authentication and authorization features.

## Features

- **User Authentication**: Supports user registration, login, and JWT token-based authentication.
- **Assignment Management**: Allows users to create, read, update, and delete assignments.
- **Grade Submission**: Teachers can grade assignments submitted by students.
- **Swagger Documentation**: Well-documented API using Swagger UI for easy integration and testing.

## Folder Structure

```
microservice-project/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── assignmentController.js
│   └── authController.js
│
├── models/
│   ├── Assignment.js
│   ├── Grade.js
│   ├── Role.js
│   ├── User.js
│   └── UserRole.js
│
├── routes/
│   ├── assignmentRoutes.js
│   └── authRoutes.js
│
├── services/
│   └── authenticateToken.js
│
├── swagger/
│   └── swagger.js
│
├── app.js
├── Dockerfile
├── package.json
├── README.md
└── .env
```

- **config**: Database configuration files.
- **controllers**: Logic for handling HTTP requests and responses.
- **models**: Database schema definitions using Sequelize ORM.
- **routes**: API endpoint definitions.
- **services**: Middleware for authenticating JWT tokens.
- **swagger**: Swagger documentation setup.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/microservice-project.git`
2. Navigate to the project directory: `cd microservice-project`
3. Install dependencies: `npm install`
4. Configure environment variables: Create a `.env` file based on `.env.example`.
5. Start the server: `npm start`

## Usage

Once the server is running, you can interact with the API endpoints using tools like Postman or curl.

## API Endpoints

The API endpoints are documented using Swagger UI. Access the documentation at `http://localhost:3000/api-docs`.

## Authentication

The API uses JWT token-based authentication. Users can obtain tokens by logging in or registering.

## Testing

The project includes unit tests for the controllers and services. Run tests using `npm test`.

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- JWT for authentication
- Swagger for API documentation

## Deployed API Link

[Your Deployed API Link]
