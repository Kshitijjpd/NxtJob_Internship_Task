# NxtJob_Internship_Task

This repository contains an API built using Node.js, Express, and MySQL to manage job postings. The API supports basic CRUD (Create, Read, Update, Delete) operations for a job posting database.
# Features 
Get All Jobs: Retrieve all job postings from the database.

Get Job by ID: Retrieve details of a specific job by its ID.

Add a New Job: Add a new job posting to the database.

Update Job by ID: Update details of an existing job by its ID.

Delete Job by ID: Delete a job posting by its ID.

# Requirements

Node.js (v14+)

MySQL server

A MySQL database with a jobpost table

# Installation
1. Clone the repository:"git clone https://github.com/yourusername/job-posting-api.gitcd job-posting-api"
2. Install dependencies: npm install
3. Set up your MySQL database:
   
   CREATE DATABASE job_posting;
   
   CREATE TABLE jobpost (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

4. Update the database connection settings in api.js:
   
   const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'job_posting',
});


# Usage
1. Start the server: node api.js
2. The server will start at http://localhost:4000.

# API Endpoints
1  Get All Jobs

. URL: /data

. Method: GET

. Description: Fetch all job postings.

. Response
[
  {
    "id": 1,
    "title": "Software Developer",
    "company": "Tech Corp",
    "location": "New York",
    "salary": "$100,000",
    "description": "Develop and maintain software applications."
  }
]

#2. Get Job by ID

. URL: /jobs/:id

. Method: GET

. Description: Fetch a specific job posting by ID.

. Response:

{
  "id": 1,
  "title": "Software Developer",
  "company": "Tech Corp",
  "location": "New York",
  "salary": "$100,000",
  "description": "Develop and maintain software applications."
}


#3  Add a New Job
. URL: /add-data

. Method: POST

. Description: Add a new job posting.

. Request Body:
     {
  "title": "Software Developer",
  "company": "Tech Corp",
  "location": "New York",
  "salary": "$100,000",
  "description": "Develop and maintain software applications."
}

. Response: Data added successfully


#4 Update Job by ID

. URL: /jobs/:id

. Method: PUT

. Description: Update a job posting by its ID.

. Request Body (any field can be updated):
{
  "title": "Senior Developer",
  "salary": "$120,000"
}

. Response: Data updated successfully

#5  Delete Job by ID

. URL: /jobs/:id

. Method: DELETE

. Description: Delete a job posting by its ID.

. Response: Data updated successfully


# Middleware Used
. body-parser: Parses incoming JSON requests.

. cors: Allows Cross-Origin Resource Sharing (CORS).

# Graceful Shutdown
The application listens for SIGINT signals to terminate the process gracefully and close the database connection.
