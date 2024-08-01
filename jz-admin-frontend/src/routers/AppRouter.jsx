// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStudentForm from '../components/AddStudentForm';
import StudentsList from '../components/StudentsList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';
import Home from '../components/Home';
// crear y adaptar import { getCookie } from '../utils/cookie';

 function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
const AppRouter = () => {

 const token = getCookie('access_token');
  return (
    <Router>
      <Routes>
        <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/students" element={<StudentsList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        {/* Ruta por defecto */}
        {/* <Route path="/" element={token ? <StudentsList /> : <LoginForm />} /> */}

       <Route path="/" element={<Home />} />
        {/* Ruta 404 */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
