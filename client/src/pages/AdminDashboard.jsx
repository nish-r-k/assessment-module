import { useState } from 'react';
import CreateAssessment from './CreateAssessment';
import ManageAssessment from './ManageAssessment';
import Button from '../components/Button';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600">Manage assessments and track performance</p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={activeTab === 'create' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('create')}
        >
          ➕ Create Assessment
        </Button>
        <Button
          variant={activeTab === 'manage' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('manage')}
        >
          📊 Manage Assessments
        </Button>
      </div>

      <div>
        {activeTab === 'create' && <CreateAssessment />}
        {activeTab === 'manage' && <ManageAssessment />}
      </div>
    </div>
  );
}
