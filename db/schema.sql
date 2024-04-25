-- schema.sql

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role TEXT NOT NULL DEFAULT 'student'
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS Assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    dueDate DATE NOT NULL,
    totalScore INTEGER NOT NULL,
    creatorId INTEGER NOT NULL,
    FOREIGN KEY (creatorId) REFERENCES Users(id) ON DELETE CASCADE
);

-- AssignmentSubmissions Table
CREATE TABLE IF NOT EXISTS AssignmentSubmissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignmentId INTEGER NOT NULL,
    studentId INTEGER NOT NULL,
    submissionDate DATETIME NOT NULL,
    submission TEXT NOT NULL,
    grade INTEGER,
    FOREIGN KEY (assignmentId) REFERENCES Assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Grades Table
CREATE TABLE IF NOT EXISTS Grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignmentId INTEGER NOT NULL,
    studentId INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    comments TEXT,
    FOREIGN KEY (assignmentId) REFERENCES Assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Roles Table
CREATE TABLE IF NOT EXISTS Roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roleName TEXT NOT NULL UNIQUE
);

-- UserRole Table
CREATE TABLE IF NOT EXISTS UserRole (
    userId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES Roles(id) ON DELETE CASCADE
);

-- Populating some users in Users table
INSERT INTO Users (username, password, role) VALUES
('ram', 'ram', 'student'),
('teacher', 'teacher', 'teacher'),
('seeta', 'seeta', 'student');

-- Adding sample assignments
INSERT INTO Assignments (title, description, dueDate, totalScore, creatorId) VALUES
('Maths Assignment', 'practice calculus problems', '2024-05-01', 100, 2),
('Physics Assignment', 'practice friction problems', '2024-05-10', 100, 2),
('Chemistry Assignment', 'practice chemical quations','2024-05-15', 100, 2),
('History Assignment', 'write history about Gol Gumbaj','2024-05-20', 100, 2),
('Essay Writing', 'write an essay about farmers','2024-05-25', 100, 2);

-- Adding sample submissions
INSERT INTO AssignmentSubmissions (assignmentId, studentId, submissionDate, submission, grade) VALUES
(1, 1, '2024-04-25', 'completed calculus problems', NULL),
(1, 3, '2024-04-25', 'completed calculus problems', NULL),
(2, 1, '2024-05-05', 'completed friction problems', NULL),
(3, 3, '2024-05-12', 'completed chemical equations', NULL),
(4, 3, '2024-05-18', 'completed history about Gol Gumbaj', NULL);



