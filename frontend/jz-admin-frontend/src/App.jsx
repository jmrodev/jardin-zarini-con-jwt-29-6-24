// import { useState, useEffect } from 'react';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import Navbar from './components/Navbar';
// import StudentsList from './components/StudentsList';
// import AddStudentForm from './components/AddStudentForm';
// import ChildrenList from './components/ChildrenList';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [view, setView] = useState('');

//   useEffect(() => {
//     // Fetch user information here
//     const fetchUser = async () => {
//       try {
//         const response = await fetch('/auth/user');
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/auth/logout', { method: 'POST' });
//       if (response.ok) {
//         setUser(null);
//         setView('');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const renderContent = () => {
//     switch (view) {
//       case 'students':
//         return <StudentsList />;
//       case 'addStudent':
//         return <AddStudentForm />;
//       case 'children':
//         return <ChildrenList />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Sistema de Gestión Escolar</h1>
//       {user ? (
//         <>
//           <p className="welcome">Bienvenido, {user.username}!</p>
//           <p>Rol: {user.role}</p>
//           <Navbar
//             user={user}
//             onLogout={handleLogout}
//             onViewStudents={() => setView('students')}
//             onAddStudent={() => setView('addStudent')}
//             onViewChildren={() => setView('children')}
//           />
//           {user.role === 'admin' && <RegisterForm />}
//           {renderContent()}
//         </>
//       ) : (
//         <LoginForm />
//       )}
//     </div>
//   );
// };

// export default App;
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>¡Hola, mundo!</h1>
    </div>
  );
};

export default App;
