const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Path to the SQLite database file
const dbPath = '../db/database.db';

// Reading the schema.sql file
const schema = fs.readFileSync('../db/schema.sql', 'utf8');

// Initializing SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Executing the schema SQL script
db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema:', err.message);
    } else {
      console.log('Schema executed successfully.');
    }
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
});
