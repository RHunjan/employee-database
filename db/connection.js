const mysql = require('mysql2');

// Connect to database
    const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '!Apple@SQL',
    database: 'firm'
  },
  console.log('Connected to the firm database.')
);

module.exports = db;