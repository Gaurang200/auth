const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'demo_db'
  });

  db.connect(err => {
    if (err) {
      console.error('Error connecting while db:', err);
      process.exit(1);
    } else {
      console.log('Connected to the db');
    }
  });
  
  module.exports = db;