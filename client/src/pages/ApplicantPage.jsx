import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaClock, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ApplicantPage = () => {
  const [assessments, setAssessments] = useState([]);

  const navigate = useNavigate();

  const handleStartAssessment = (assessmentId) => {
    navigate(`/take-assessment/${assessmentId}`);
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/assessments');//backend url
        setAssessments(res.data);
      } catch (err) {
        console.error('Error fetching assessments:', err);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold mb-6">Available Assessments</h1>
      <p className="text-gray-600 mb-8">Choose an assessment to begin</p>

      {assessments.map((a) => (
        <div
          key={a._id}
          className="bg-white shadow-md rounded-lg p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{a.title}</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Live</span>
          </div>
          <p className="text-gray-700 mb-4">{a.description}</p>

          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <FaClock /> {a.timeLimit} minutes
            </div>
            <div className="flex items-center gap-2">
              <FaFileAlt /> {a.questions.length} questions
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs">
              {a.questions.reduce((acc, q) => acc + Number(q.marks), 0)} marks
            </div>
          </div>

          <button
            onClick={() => handleStartAssessment(a._id)}
            className="bg-blue-500 px-4 py-2 text-white rounded"
          >
            Start Assessment
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApplicantPage;
