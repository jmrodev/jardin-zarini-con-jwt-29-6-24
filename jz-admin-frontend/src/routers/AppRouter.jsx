import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddStudentForm from '../components/AddStudentForm';
import StudentsList from '../components/StudentsList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';
import Home from '../pages/Home';
import ArticlesList from '../components/ArticlesList'; // Asegúrate de que la importación sea correcta
import CreateArticleForm from '../components/CreateArticleForm'; // Asegúrate de que la importación sea correcta
import EditArticleForm from '../components/EditArticleForm'; // Asegúrate de que la importación sea correcta

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rutas de Estudiantes */}
        <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/students" element={isAuthenticated ? <StudentsList /> : <Navigate to="/login" />} />
        
        {/* Rutas de Artículos */}
        <Route path="/articles" element={isAuthenticated ? <ArticlesList /> : <Navigate to="/login" />} />
        <Route path="/create-article" element={isAuthenticated ? <CreateArticleForm onCreate={() => {}} /> : <Navigate to="/login" />} />
        <Route path="/edit-article/:id" element={isAuthenticated ? <EditArticleForm article={{}} onClose={() => {}} onSave={() => {}} /> : <Navigate to="/login" />} />
        
        {/* Rutas de Autenticación */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
        <Route path="/logout" element={<Logout />} />

        {/* Ruta Principal */}
        {/* <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/" element={<ArticlesList />} />
        {/* Ruta 404 */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
