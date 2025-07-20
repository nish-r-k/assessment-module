import React, { useState } from 'react';
import CreateAssessment from '../pages/CreateAssessment';
import ManageAssessment from '../pages/ManageAssessment';

const AssessmentTab = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="p-4 ">
      {/* Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('create')}
        >
          + Create Assessment
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'manage' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('manage')}
        >
          📊 Manage Assessments
        </button>
      </div>

      {/* Conditional Content */}
      {activeTab === 'create' ? (
        <CreateAssessment />
      ) : (
        <ManageAssessment />
      )}
    </div>
  );
};

export default AssessmentTab;
