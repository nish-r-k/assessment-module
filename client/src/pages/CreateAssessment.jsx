import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAssessment = () => {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const [questionData, setQuestionData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    marks: '',
  });

  const [questionsList, setQuestionsList] = useState([]);

  const handleAssessmentChange = (e) => {
    const { name, value } = e.target;
    setAssessment({ ...assessment, [name]: value });
  };

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleCorrectOptionChange = (index) => {
    setQuestionData({ ...questionData, correctOption: index });
  };

  const handleMarksChange = (e) => {
    setQuestionData({ ...questionData, marks: e.target.value });
  };

  const addQuestion = () => {
    if (
      questionData.question &&
      questionData.options.every(opt => opt.trim() !== '') &&
      questionData.marks
    ) {
      setQuestionsList([...questionsList, questionData]);
      setQuestionData({
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        marks: '',
      });
    }
  };

  const handleSaveAssessment = async () => {
    const fullData = {
      title: assessment.title,
      description: assessment.description,
      timeLimit: Number(assessment.duration),
      questions: questionsList.map(q => ({
        question: q.question,
        options: q.options,
        correctOption: Number(q.correctOption),
        marks: Number(q.marks)
      }))
    };

    try {
      const res = await axios.post("http://localhost:5000/api/assessments", fullData);
      console.log('Server response:', res.data);
      alert('Assessment saved successfully!');
      setAssessment({ title: '', description: '', duration: '' });
      setQuestionsList([]);
    } catch (error) {
      console.error("Error saving assessment:", error.response?.data || error.message);
      alert("Failed to save assessment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
       

        {/* Assessment Info */}
        <h2 className="text-2xl font-bold text-center mb-6">Create New Assessment</h2>
        <div className="space-y-4 mb-8">
          <input
            type="text"
            name="title"
            placeholder="Assessment Title"
            value={assessment.title}
            onChange={handleAssessmentChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Assessment Description"
            value={assessment.description}
            onChange={handleAssessmentChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes)"
            value={assessment.duration}
            onChange={handleAssessmentChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Add Question */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Add Question</h3>

          <input
            type="text"
            placeholder="Question"
            value={questionData.question}
            onChange={handleQuestionChange}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          />

          {questionData.options.map((opt, idx) => (
            <div key={idx} className="flex items-center mb-3">
              <input
                type="text"
                value={opt}
                placeholder={`Option ${idx + 1}`}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full border p-3 rounded-lg mr-4"
              />
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  checked={questionData.correctOption === idx}
                  onChange={() => handleCorrectOptionChange(idx)}
                  name="correctOption"
                  className="w-4 h-4"
                />
                <span>Correct</span>
              </label>
            </div>
          ))}

          <input
            type="number"
            placeholder="Marks"
            value={questionData.marks}
            onChange={handleMarksChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <button
            onClick={addQuestion}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            ➕ Add Question
          </button>
        </div>

        {/* Questions List */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-bold mb-2">Added Questions</h3>
          {questionsList.length === 0 ? (
            <p className="text-gray-500 italic">No questions added yet.</p>
          ) : (
            <ul className="space-y-4">
              {questionsList.map((q, index) => (
                <li key={index} className="border p-4 rounded bg-gray-50">
                  <p className="font-semibold">Q{index + 1}: {q.question}</p>
                  <ul className="ml-4 list-disc text-sm mt-2">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>
                        {opt}
                        {q.correctOption === idx && (
                          <span className="text-green-600 font-semibold ml-2">(Correct)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm mt-1">Marks: {q.marks}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Save Assessment */}
        <div className="mt-8 text-right">
          <button
            onClick={handleSaveAssessment}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAssessment;
