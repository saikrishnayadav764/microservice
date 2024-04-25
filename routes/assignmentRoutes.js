// assignmentRoutes.js

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user and return a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             default:
 *               summary: Log in as default user
 *               value:
 *                 username: teacher
 *                 password: teacher
 *             ram:
 *               summary: Log in as user ram
 *               value:
 *                 username: ram
 *                 password: ram
 *             teacher:
 *               summary: Log in as user seeta
 *               value:
 *                 username: seeta
 *                 password: seeta
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User account created successfully
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Assignment
 *   description: Assignment endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         role:
 *           type: string
 *
 *     Assignment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date
 *         totalScore:
 *           type: integer
 *         creatorId:
 *           type: integer
 *
 *     AssignmentSubmission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         assignmentId:
 *           type: integer
 *         studentId:
 *           type: integer
 *         submissionDate:
 *           type: string
 *           format: date-time
 *         submission:
 *           type: string
 *         grade:
 *           type: integer
 *
 *     Grade:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         assignmentId:
 *           type: integer
 *         studentId:
 *           type: integer
 *         grade:
 *           type: integer
 *         comments:
 *           type: string
 *
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         roleName:
 *           type: string
 *
 *     UserRole:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         roleId:
 *           type: integer
 */


/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get all assignments with optional filtering
 *     tags: [Assignment]
 *     parameters:
 *       - in: query
 *         name: dueDateBefore
 *         schema:
 *           type: string
 *           format: date
 *         description: Retrieve assignments due before this date
 *       - in: query
 *         name: minScore
 *         schema:
 *           type: integer
 *         description: Retrieve assignments with a total score greater than or equal to this value
 *       - in: query
 *         name: maxScore
 *         schema:
 *           type: integer
 *         description: Retrieve assignments with a total score less than or equal to this value
 *       - in: query
 *         name: creatorId
 *         schema:
 *           type: integer
 *         description: Retrieve assignments created by a specific user ID
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: List of assignments
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     summary: Get a specific assignment by ID
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the assignment
 *     responses:
 *       200:
 *         description: Assignment details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/{id}:
 *   put:
 *     summary: Update an assignment by ID
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the assignment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               totalScore:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the assignment
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/{id}/submit:
 *   post:
 *     summary: Submit an assignment by ID (for students)
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the assignment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               submission:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/{id}/grade:
 *   post:
 *     summary: Grade an assignment by ID (for teachers)
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the assignment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *               grade:
 *                 type: integer
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assignment graded successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/students/{id}:
 *   get:
 *     summary: Get assignments for a specific student
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: List of assignments for the student
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/teachers/{id}:
 *   get:
 *     summary: Get assignments created by a specific teacher
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the teacher
 *     responses:
 *       200:
 *         description: List of assignments created by the teacher
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /assignments/students/all:
 *   get:
 *     summary: Route to get all students' assignment submissions (accessible only to teachers)
 *     tags: [Assignment]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: List of all students' assignment submissions
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticateToken } = require('../services/authenticateToken');

// POST /assignments: Create a new assignment
router.post('/',authenticateToken, assignmentController.createAssignment);

// GET /assignments: Get all assignments
router.get('/',authenticateToken, assignmentController.getAllAssignments);

// GET /assignments/:id: Get a specific assignment by ID
router.get('/:id',authenticateToken, assignmentController.getAssignmentById);

// PUT /assignments/:id: Update an assignment by ID
router.put('/:id',authenticateToken, assignmentController.updateAssignmentById);

// DELETE /assignments/:id: Delete an assignment by ID
router.delete('/:id',authenticateToken, assignmentController.deleteAssignmentById);


/************ Additional Endpoints ************/


// POST /assignments/:id/submit: Submit an assignment by ID (for students)
router.post('/:id/submit',authenticateToken, assignmentController.submitAssignment);

// POST /assignments/:id/grade: Grade an assignment by ID (for teachers)
router.post('/:id/grade',authenticateToken, assignmentController.gradeAssignment);

// GET /students/all Route to get all students' assignment submissions (accessible only to teachers)
router.get('/students/all', authenticateToken, assignmentController.getAllStudentsAssignments);

// GET /students/:id: Get assignments for a specific student
router.get('/students/:id',authenticateToken, assignmentController.getStudentAssignments);

// GET /teachers/:id: Get assignments created by a specific teacher
router.get('/teachers/:id',authenticateToken, assignmentController.getTeacherAssignments);


module.exports = router;
