const mongoose = require('mongoose');
const Joi = require('joi');

// Subject Schema
const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  marks: { type: Number, required: true }
});

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: [subjectSchema],
});

// Create a virtual for totalMarks
studentSchema.virtual('totalMarks').get(function() {
  return this.subjects.reduce((acc, subject) => acc + subject.marks, 0);
});

// Validation function using Joi
const validateStudent = (student) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    subjects: Joi.array().items(
      Joi.object({
        subjectName: Joi.string().required(),
        marks: Joi.number().min(0).max(100).required(),
      })
    ).min(1).required(),
  });
  return schema.validate(student);
};

const validateUpdateStudent = (student) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    subjects: Joi.array().items(
      Joi.object({
        subjectName: Joi.string().optional(),
        marks: Joi.number().min(0).max(100).optional(),
      })
    ).min(1).optional(),
  });
  return schema.validate(student);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student, validateStudent,validateUpdateStudent };
