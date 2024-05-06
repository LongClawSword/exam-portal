import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentRegister from './pages/StudentRegister';
import StudentLogin from './pages/StudentLogin';
import StudentExamResult from './pages/StudentExamResult';
import StudentExam from './pages/StudentExam';
import StudentDashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSubmissions from './pages/AdminSubmissions';
import AdminSubmission from './pages/AdminSubmission';
import AdminCreateExam from './pages/AdminCreateExam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard/:studentId" element={<StudentDashboard />} />
        <Route path="/student-exam/:studentId/:examId" element={<StudentExam />} />
        <Route path="/student-exam-result/:studentId/:examId" element={<StudentExamResult />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-submissions/:examId" element={<AdminSubmissions />} />
        <Route path="/admin-submission/:examId/:studentId" element={<AdminSubmission />} />
        <Route path="/admin-create-exam" element={<AdminCreateExam />} />
      </Routes>
    </Router>
  );
}

export default App;
