import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterCompany from "./pages/RegisterCompany.jsx";
import UploadDocuments from "./pages/UploadDocuments.jsx";
import ScadDashboard from "./pages/ScadDashboard.jsx"; 
import CompanyJobs from "./pages/CompanyJobs.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/login"; // add this line
import StudentDashboard from "./pages/StudentDashboard";
import ProDashboard from "./pages/ProDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/upload-documents" element={<UploadDocuments />} />
          <Route path="/scad-dashboard" element={<ScadDashboard />} />
          <Route path="/company-jobs" element={<CompanyJobs />} />
          <Route path="/login" element={<login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/pro-dashboard" element={<ProDashboard />} />
<Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
