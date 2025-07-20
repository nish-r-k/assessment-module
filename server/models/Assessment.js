

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: Number,
  marks: Number,
});

const AssessmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  timeLimit: Number,
  questions: [QuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;
