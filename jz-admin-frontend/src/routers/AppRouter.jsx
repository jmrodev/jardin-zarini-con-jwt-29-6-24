import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddStudentForm from '../components/AddStudentForm';
import StudentsList from '../components/StudentsList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';
import Home from '../pages/Home';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/students" element={isAuthenticated ? <StudentsList /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />        
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

