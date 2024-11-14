const { Student, validateStudent,validateUpdateStudent } = require('../models/studentModel');

// Create a new student
exports.createStudent = async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = new Student(req.body);

  try {
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get a student by ID

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    
    // Convert student document to a plain object
    const studentObj = student.toObject();
    
    // Calculate total marks from subjects array
    if (studentObj.subjects && studentObj.subjects.length > 0) {
      const totalMarks = studentObj.subjects.reduce((sum, subject) => sum + subject.marks, 0);
      studentObj.totalMarks = totalMarks;
    } else {
      studentObj.totalMarks = 0;
    }
    
    res.status(200).send(studentObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update student details
exports.updateStudent = async (req, res) => {
  const { error } = validateUpdateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.status(200).send('Student deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
