const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Add this line
const cors = require('cors');

// Create the app instance
const app = express();
const port = 4000;

// Middleware to parse JSON request body using body-parser
app.use(bodyParser.json()); // This is the key change here
app.use(bodyParser.urlencoded({ extended: true }));


// Allow all origins (or customize it for specific origins)
app.use(cors());  

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kumar@123',
  database: 'job_posting',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Define `/data` route (GET request to fetch data)
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM jobpost', (err, results) => {
    if (err) {
      console.error('Query error:', err.stack);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

// Define `/add-data` route (POST request to add new data)
app.post('/add-data', (req, res) => {
    const { title, company, location,salary,description } = req.body;
  
    // Validate input data
    if (!title || !company ||!location || !salary ||!description) {
      return res.status(400).send('Missing required fields');
    }
  
    // SQL query to insert data into the table
    const query = 'INSERT INTO jobpost (title, company, location,salary,description ) VALUES (?, ?,?,?, ?)';
    
    connection.query(query, [title, company, location,salary,description ], (err, results) => {
      if (err) {
        console.error('Query error:', err.stack);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully:', results);
        res.status(201).send('Data added successfully');
      }
    })
});

// Define `/jobs/:id` route (GET request to fetch data by enrollement_no)
app.get('/jobs/:id', (req, res) => {
    const id = req.params.id;
  
    // Validate the enrollement_no parameter
    if (!id) {
      return res.status(400).send('Missing required parameter:id');
    }
  
    // SQL query to fetch data by id
    const query = 'SELECT * FROM jobpost WHERE id = ?';
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Query error:', err.stack);
        return res.status(500).send('Error retrieving data');
      }
  
      if (results.length === 0) {
        return res.status(404).send('No data found for the given job_id');
      }
  
      // Respond with the found data
      res.json(results[0]); // Assuming you want to return a single object, not an array
    });
  });

  // Define `/jobs/:id` route (PUT request to update data by enrollement_no)
app.put('/jobs/:id', (req, res) => {
    const id = req.params.id; // Get enrollement_no from URL params
    const { title, company, location,salary,description } = req.body; // Get updated data from the request body
  
    // Validate input
    if (!title && !company && !location && !salary && !description ) {
      return res.status(400).send('At least one field (missing) is required to update');
    }
  
    // Prepare the update query and dynamic fields
    let query = 'UPDATE jobpost SET ';
    const fields = [];
    const values = [];
  
    if (title) {
      fields.push('title = ?');
      values.push(title);
    }
    if (company) {
      fields.push('company = ?');
      values.push(company);
    }
    if (location) {
      fields.push('location = ?');
      values.push(location);
    }if (salary) {
      fields.push('salary = ?');
      values.push(salary);
    }
    if (description) {
      fields.push('description = ?');
      values.push(description);
    }
  
    query += fields.join(', ') + ' WHERE id = ?';
    values.push(id);
  
    // Execute the update query
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Query error:', err.stack);
        return res.status(500).send('Error updating data');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send('No data found for the given id');
      }
  
      console.log('Data updated successfully:', results);
      res.status(200).send('Data updated successfully');
    });
  });

  // Define `/jobs/:id` route (DELETE request to delete data by enrollement_no)
app.delete('/jobs/:id', (req, res) => {
    const id = req.params.id; // Get enrollement_no from URL params
  
    // Validate input
    if (!id) {
      return res.status(400).send('Missing required parameter: id');
    }
  
    // SQL query to delete the record
    const query = 'DELETE FROM jobpost WHERE id = ?';
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Query error:', err.stack);
        return res.status(500).send('Error deleting data');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send('No data found for the given id');
      }
  
      console.log('Data deleted successfully:', results);
      res.status(200).send('Data deleted successfully');
    });
  });
  
  
  

// Handle server termination gracefully
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.stack);
    }
    console.log('Database connection closed.');
    process.exit();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
