// assignmentController.js

const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');
const Grade = require('../models/Grade');
const User = require('../models/User');
const { Op } = require('sequelize');

// Creating a new assignment
exports.createAssignment = async (req, res) => {
  try {

    // Getting the user ID from the request
    const userId = req.userId;


    // Finding the user in the database
    const user = await User.findByPk(userId)
    // Checking if the user exists and has the role of 'teacher'
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ error: 'Unauthorized: Only teachers can create assignments' });
    }
 
    const { title, description, dueDate, totalScore, creatorId=req.userId } = req.body;


    
    // Creating the assignment
    const newAssignment = await Assignment.create({
      title,
      description,
      dueDate,
      totalScore,
      creatorId
    });

    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Getting all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    // Getting query parameters for filtering
    const { dueDateBefore, minScore, maxScore, creatorId } = req.query;

    // Building the filter object based on query parameters
    const whereClause = {};
    if (dueDateBefore) {
      whereClause.dueDate = { [Op.lt]: dueDateBefore }; // Due date before a specific date
    }
    if (minScore !== undefined && maxScore !== undefined) {
      whereClause.totalScore = { [Op.between]: [minScore, maxScore] }; // Total score between minScore and maxScore
    } else if (minScore !== undefined) {
      whereClause.totalScore = { [Op.gte]: minScore }; // Total score greater than or equal to minScore
    } else if (maxScore !== undefined) {
      whereClause.totalScore = { [Op.lte]: maxScore }; // Total score less than or equal to maxScore
    }
    if (creatorId) {
      whereClause.creatorId = creatorId; // Filter by creatorId
    }

    // Getting all assignments with applied filters
    const assignments = await Assignment.findAll({
      where: whereClause,
      include: [{ model: User, as: 'Creator', attributes: ['username'] }] // Include User model with alias 'Creator' to get creator's name
    });

    res.json(assignments);
  } catch (error) {
    console.error('Error getting all assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Getting a specific assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);

    // Checking if assignment exists
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Error getting assignment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Updating an assignment by ID
exports.updateAssignmentById = async (req, res) => {
  try {

    // Geting the user ID from the request
    const userId = req.userId;


    // Finding the user in the database
    const user = await User.findByPk(userId)
    // Checking if the user exists and has the role of 'teacher'
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ error: 'Unauthorized: Only teachers can update assignments' });
    }

    const { id } = req.params;
    const { title, description, dueDate, totalScore } = req.body;
 

    // Finding the assignment by ID
    const assignment = await Assignment.findByPk(id);

    // Checking if assignment exists
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Updating the assignment
    assignment.title = title;
    assignment.description = description;
    assignment.dueDate = dueDate;
    assignment.totalScore = totalScore;
    await assignment.save();

    res.json(assignment);
  } catch (error) {
    console.error('Error updating assignment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deleting an assignment by ID
exports.deleteAssignmentById = async (req, res) => {
  try {

    // Getting the user ID from the request
    const userId = req.userId;


    // Finding the user in the database
    const user = await User.findByPk(userId)
    // Checking if the user exists and has the role of 'teacher'
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ error: 'Unauthorized: Only teachers can delete assignments' });
    }

    const { id } = req.params;

    // Finding the assignment by ID
    const assignment = await Assignment.findByPk(id);

    // Checking if assignment exists
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Deleting the assignment
    await assignment.destroy();

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Submiting an assignment by ID (for students)
exports.submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId=req.userId, submission } = req.body;

    // Checking if the assignment exists
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Submiting the assignment
    const submissionRecord = await AssignmentSubmission.create({
      assignmentId: id,
      studentId,
      submission,
      submissionDate: new Date()
    });

    res.status(201).json(submissionRecord);
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Grading an assignment by ID (for teachers)
exports.gradeAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, grade, comments } = req.body;

    // Checking if the assignment exists
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Checking if the student has submitted the assignment
    const submission = await AssignmentSubmission.findOne({ where: { id, studentId } });
    if (!submission) {
      return res.status(404).json({ error: 'Student has not submitted the assignment.' });
    }

    

    // Grading the assignment
    const gradeRecord = await Grade.create({
      assignmentId: id,
      studentId,
      grade,
      comments
    });



    await AssignmentSubmission.update({ grade }, { where: { id, studentId } });

    res.status(201).json(gradeRecord);
  }
   catch (error) {
    console.error('Error grading assignment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Getting assignments for a specific student
exports.getStudentAssignments = async (req, res) => {
  try {
    const { id } = req.params;

    const teachers = await User.findAll({
      where: {
        role: 'teacher' // Assuming 'teacher' is the role for teachers
      },
      attributes: ['id'] // Select only the 'id' attribute
    });

    // Extract teacher IDs from the result
    const teacherIds = teachers.map(teacher => teacher.id);

    if(!teacherIds.includes(+id)){
      if(req.userId!==+id){
        return res.status(403).json({ error: 'You can access assignments only submitted by you' });
      }
    }
    



    // Getting assignments for the specific student
    const assignments = await AssignmentSubmission.findAll({
      where: { studentId: id }
    });

    res.json(assignments);
  } catch (error) {
    console.error('Error getting student assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Getting assignments created by a specific teacher
exports.getTeacherAssignments = async (req, res) => {
  try {
    const { id } = req.params;

    // Finding the user in the database
    const user = await User.findByPk(id)
    // Checking if the user exists and has the role of 'teacher'
    if (!user || user.role !== 'teacher') {
      return res.status(403).json({ error: 'No teachers are there with this Id' });
    }


    // Getting assignments created by the specific teacher
    const assignments = await Assignment.findAll({ where: { creatorId: id } });

    res.json(assignments);
  } catch (error) {
    console.error('Error getting teacher assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Getting all students' assignment submissions (accessible only to teachers)
exports.getAllStudentsAssignments = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const { role } = user;

    // Checking if the user is a teacher
    if (role !== 'teacher') {
      return res.status(403).json({ error: 'Forbidden: Only teachers have access to this resource.' });
    }

    // Getting query parameters for filtering and sorting
    const { sortBy, sortOrder, dueDateBefore, dueDateAfter, minScore, maxScore } = req.query;

    // Building the filter object based on query parameters
    const whereClause = {};
    if (dueDateBefore) {
      whereClause.submissionDate = { [Op.lt]: dueDateBefore }; // Submission date before a specific date
    }
    if (dueDateAfter) {
      whereClause.submissionDate = { [Op.gt]: dueDateAfter }; // Submission date after a specific date
    }
    if (minScore !== undefined && maxScore !== undefined) {
      whereClause.grade = { [Op.between]: [minScore, maxScore] }; // Grade between minScore and maxScore
    } else if (minScore !== undefined) {
      whereClause.grade = { [Op.gte]: minScore }; // Grade greater than or equal to minScore
    } else if (maxScore !== undefined) {
      whereClause.grade = { [Op.lte]: maxScore }; // Grade less than or equal to maxScore
    }

    // Sorting
    let order = [['submissionDate', 'ASC']]; // Default sorting by submission date ascending
    if (sortBy && ['submissionDate', 'grade'].includes(sortBy)) {
      order = [[sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']];
    }

    // Including related models to get assignment title and student name
    const submissions = await AssignmentSubmission.findAll({
      where: whereClause,
      order: order,
      include: [
        { model: Assignment, attributes: ['title'] }, // Including Assignment model to get assignment title
        { model: User, as: 'Student', attributes: ['username'] } // Including User model to get student's name
      ]
    });

    // If there are no submissions, returning a message
    if (submissions.length === 0) {
      return res.status(404).json({ message: 'No submissions found.' });
    }

    res.json(submissions);
  } catch (error) {
    console.error('Error getting all students\' assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};