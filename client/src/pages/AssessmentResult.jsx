import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const AssessmentResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
  const fetchResult = async () => {
    try {
      const res = await axios.get(`/api/submissions/${resultId}`);
      console.log("Fetched result:", res.data);  
      setResult(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load result");
      setLoading(false);
    }
  };

  console.log("Result ID:", resultId); 
  fetchResult();
}, [resultId]);

if (!result) {
  console.log("No result yet"); 
  return null;
}


  if (loading) {
    return <div className="text-center mt-20">Loading result...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if(!result) return null;
const {
  score = 0,
  totalMarks = 0,
  attempted = 0,
  totalQuestions = 0,
  correctAnswers = 0,
  incorrect = 0,
  assessmentTitle, 
} = result;

const title = assessmentTitle || "Assessment"; 
const correct = correctAnswers; 

  //const percentage = Math.round((score / totalMarks) * 100);
  const percentage = totalMarks ? Math.round((score/totalMarks) * 100):0;
  const feedback =
    percentage >= 80 ? "Excellent" :
    percentage >= 50 ? "Good Job" : "Needs Improvement";

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <div className="text-red-500 text-5xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold mb-2">Assessment Completed!</h2>
        <p className="mb-4 text-gray-600">Thank you for completing "{title}"</p>

        <div className="text-4xl font-bold text-red-600 mb-2">{percentage}%</div>
        <p className="text-xl text-red-500 font-semibold mb-6">{feedback}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded">
            <p className="text-2xl font-bold text-blue-600">{score}</p>
            <p className="text-gray-600">Score Obtained</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-2xl font-bold text-gray-800">{totalMarks}</p>
            <p className="text-gray-600">Total Marks</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <p className="text-2xl font-bold text-green-600">{attempted}/{totalQuestions}</p>
            <p className="text-gray-600">Questions Attempted</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <div className="text-green-600 flex items-center gap-2">
            <FaCheckCircle /> Correct: {correct}
          </div>
          <div className="text-red-600 flex items-center gap-2">
            <FaTimesCircle /> Incorrect: {incorrect}
          </div>
        </div>

        <button
          onClick={() => navigate("/applicant")}
          className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
        >
           Back to Assessments
        </button>
      </div>
    </div>
  );
};

export default AssessmentResult;
