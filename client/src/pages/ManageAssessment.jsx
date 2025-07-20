
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ClockIcon,
  UsersIcon,
  TrashIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const ManageAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [applicantCount, setApplicantCount] = useState(0);

  useEffect(() => {
    const fetchApplicantCount = async () => {
      try {
        const res = await axios.get("/api/applicants/count");
        setApplicantCount(res.data.count);
      } catch (err) {
        console.error("Error fetching applicant count:", err);
      }
    };

    fetchApplicantCount();
  }, []);


  const fetchAssessments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/assessments');
      setAssessments(res.data);
    } catch (err) {
      console.error('Failed to fetch assessments:', err);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/assessments/${id}`);
      const updated = assessments.filter((item) => item._id !== id);
      setAssessments(updated);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (assessments.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-20 bg-gray-200">
        <DocumentTextIcon className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold">No assessments created</h3>
        <p className="text-gray-500 text-sm">Create your first assessment to get started.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 ">
      {assessments.map((assessment) => (
        <div
          key={assessment._id}
          className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{assessment.title}</h2>
              <p className="text-gray-600 mt-1">{assessment.description}</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                <ClockIcon className="h-4 w-4" /> {assessment.timeLimit} mins
              </p>
            </div>
            <button
              onClick={() => handleDelete(assessment._id)}
              className="text-red-600 hover:text-red-700"
              title="Delete"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-700">
                {assessment.questions?.length || 0} Questions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-700">
                {/* {assessment.applicants || 0} Applicants */}
                {applicantCount} Applicants
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 items-center text-sm text-gray-600">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Total Marks: {assessment.questions?.reduce((sum, q) => sum + (q.marks || 1), 0)}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Created: {new Date(assessment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageAssessment;

