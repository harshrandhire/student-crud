# Student CRUD API

This is a simple CRUD API for managing student data using Express.js and MongoDB.

## Features
- Create a student with name and subjects (each subject contains name and marks).
- Retrieve all students or a single student by ID.
- Update student details.
- Delete a student by ID.
- Calculates total marks for each student.

## Requirements
- Node.js
- MongoDB

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/student-crud-api.git
    cd student-crud-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables in `.env`:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/studentDB
    ```

4. Run the server:
    ```bash
    npm start
    ```

The API will be available at `http://localhost:5000`.

## API Endpoints

### POST /api/students
Create a new student.

Request body:
```json
{
  "name": "John Doe",
  "subjects": [
    { "subjectName": "Math", "marks": 85 },
    { "subjectName": "Science", "marks": 90 }
  ]
}
