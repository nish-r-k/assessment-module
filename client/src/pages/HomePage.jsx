import React from 'react';
import { useNavigate } from 'react-router-dom';
import test from '../assets/test.jpg'; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 bg-gray-200">
     
      
      <div className="md:w-1/2 mt-12 md:mt-0 text-center md:text-left">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">AssessIQ</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
           Online <span className="text-blue-600">Assessment Platform</span>
        </h1>
        <p className="text-gray-600 mb-6 text-base md:text-lg">
         A simple and effective platform to MCQ assessments online. Built with user-friendly features for smooth evaluation and secure test-taking.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => navigate('/assessment-tabs')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Create Test
          </button>
          <button
            onClick={() => navigate('/applicant/auth')}
            className="px-6 py-3 bg-gray-100 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
          >
            Take Test
          </button>
        </div>
      </div>

      
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={test}
          alt="Assessment Illustration"
          className="max-w-sm w-full rounded-2xl shadow-2xl"
        />
      </div>
    </div>
    
    
  );
};

export default HomePage;
