import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateAssessment from './pages/CreateAssessment';
import ApplicantPage from './pages/ApplicantPage';
import TakeAssessment from './pages/TakeAssessment';
import AssessmentResult from './pages/AssessmentResult';
import ApplicantAuth from './components/ApplicantAuth';
import AssessmentTab from './components/AssesmentTab';

import ManageAssessment from './pages/ManageAssessment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<CreateAssessment />} />
        {/* <Route path="/manage" element={<Manage />} /> */}
        <Route path="/manage" element={<ManageAssessment />} />
        

        <Route path="/applicant" element={<ApplicantPage />} />
        <Route path="/applicant/auth" element={<ApplicantAuth/>} />
        <Route path="/assessment-tabs" element={<AssessmentTab/>} />
        <Route path="/take-assessment/:id" element={<TakeAssessment />} />
       <Route path="/assessment-result/:resultId" element={<AssessmentResult />} />


      </Routes>
    </Router>
    
  );
}

export default App;
