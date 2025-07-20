

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaClock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TakeAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/assessments/${id}`);
        setAssessment(res.data);
        setAnswers(Array(res.data.questions.length).fill(null));
        setTimeLeft(res.data.timeLimit * 60);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch assessment');
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [id]);

  useEffect(() => {
    if (!timeLeft || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleOptionChange = (option) => {
    if (isSubmitted) return;
    const updated = [...answers];
    updated[currentQuestionIndex] = option;
    setAnswers(updated);
  };


const handleSubmit = async (auto = false) => {
  if (isSubmitted || !assessment) return;

  setIsSubmitted(true);

  const payloadAnswers = assessment.questions.map((q, index) => {
    const selectedOption = answers[index];
    return {
      questionId: q._id ,
      selectedOption: selectedOption || '',
      //isCorrect: selectedOption === q.correctOption,
    };
  });

  try {
    const applicantName = localStorage.getItem('applicantName') || 'Anonymous';

    const res = await axios.post('http://localhost:5000/api/submissions/submit', {
      applicantName,
      assessmentId: id,
      answers: payloadAnswers,
    });

    const result = res.data.submission;

    if (auto) {
      toast.info('Time is up! Assessment auto-submitted.');
    } else {
      toast.success('Assessment submitted successfully!');
    }

    if(result && result._id){
    setTimeout(() => navigate(`/assessment-result/${result._id}`), 2000);
    }else{
      console.error("Submission result missing _id",result);
      
    }

  } catch (err) {
    console.error('Submit error:', err);
    toast.error('Error submitting assessment');
  }
};

  if (loading) return <div className="p-4">Loading...</div>;
  if (!assessment) return <div className="p-4 text-red-600">Assessment not found.</div>;

  const question = assessment.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <ToastContainer />

      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">{assessment.title}</h2>
          <p className="text-gray-500">
            Question {currentQuestionIndex + 1} of {assessment.questions.length}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center text-red-500 font-bold text-lg">
            <FaClock className="mr-2" /> {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => navigate('/')}
            className="border px-4 py-1 rounded hover:bg-gray-100"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <div
          className="bg-black h-3 rounded-full"
          style={{ width: `${((currentQuestionIndex + 1) / assessment.questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">{question.question}</h3>
          <div className="bg-black text-white text-sm px-3 py-1 rounded-full">
            {question.marks || 1} marks
          </div>
        </div>

        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center border px-4 py-2 rounded cursor-pointer ${
                answers[currentQuestionIndex] === option ? 'bg-gray-100 border-blue-400' : ''
              } ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={() => handleOptionChange(option)}
                className="mr-3"
                disabled={isSubmitted}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 rounded bg-white border shadow text-gray-700 disabled:opacity-50"
          disabled={currentQuestionIndex === 0 || isSubmitted}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {assessment.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIndex(idx)}
              disabled={isSubmitted}
              className={`w-8 h-8 rounded text-white ${
                idx === currentQuestionIndex ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 disabled:opacity-50"
          onClick={() => handleSubmit(false)}
          disabled={isSubmitted}
        >
           Submit
        </button>
      </div>
    </div>
  );
};

export default TakeAssessment;
