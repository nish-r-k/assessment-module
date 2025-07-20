

import Submission from '../models/Submission.js';
import Assessment from '../models/Assessment.js';

export const submitAssessment = async (req, res) => {
  try {
    const { applicantName, assessmentId, answers } = req.body;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });

    const totalQuestions = assessment.questions.length;
    let score = 0;
    let correctAnswers = 0;

    const evaluatedAnswers = assessment.questions.map((question) => {
      const userAnswer = answers.find((ans) => ans.questionId === question._id.toString());

      if (!userAnswer) {
        return {
          questionId: question._id,
          selectedOption: null,
          isCorrect: false,
        };
      }

      const selectedText = userAnswer.selectedOption;
      const selectedIndex = question.options.findIndex(
        (opt) => opt.trim().toLowerCase() === selectedText.trim().toLowerCase()
      );

      const isCorrect = selectedIndex === question.correctOption;

      if (isCorrect) {
        score += Number(question.marks);
        correctAnswers++;
      }

      return {
        questionId: question._id,
        selectedOption: selectedText,
        isCorrect,
      };
    });

    const totalMarks = assessment.questions.reduce((acc, q) => acc + Number(q.marks), 0);
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    const submission = new Submission({
      applicantName,
      assessmentId,
      answers: evaluatedAnswers,
      totalQuestions,
      correctAnswers,
      score,
      totalMarks,
      attempted: answers.length,
      incorrect: answers.length - correctAnswers,
      accuracy,
    });

    await submission.save();

    res.status(201).json({
      message: 'Assessment submitted successfully',
      submission, // <-- front-end expects this
    });
  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
};

export const getResultById = async (req, res) => {
  try {
    const { resultId } = req.params;

    const submission = await Submission.findById(resultId).lean();
    if (!submission) return res.status(404).json({ error: 'Result not found' });

    const assessment = await Assessment.findById(submission.assessmentId).lean();

    const resultData = {
      _id: submission._id,
      applicantName: submission.applicantName,
      score: submission.score,
      totalMarks: submission.totalMarks,
      attempted: submission.attempted,
      correctAnswers: submission.correctAnswers,
      incorrect: submission.incorrect,
      totalQuestions: submission.totalQuestions,
      accuracy: submission.accuracy,
      submittedAt: submission.submittedAt,
      assessmentTitle: assessment?.title || 'Assessment',
    };

    res.status(200).json(resultData);
  } catch (error) {
    console.error('Get Result Error:', error);
    res.status(500).json({ error: 'Failed to fetch result' });
  }
};
