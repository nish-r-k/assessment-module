
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true,
  },
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedOption: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
      },
    },
  ],
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number,
  totalMarks: Number,
  attempted: Number,
  incorrect: Number,
  accuracy: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
