import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Aside from '../components/Aside';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext'; // Importar el hook
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Usar el hook para obtener el estado y las funciones

  return (
    <div className="container">
      <Header />
      <Aside>
        <Nav /> {/* Mensaje de depuración */}
      <p className="debug-message">
        Estado de autenticación: {isAuthenticated ? 'Autenticado' : 'No autenticado'}
      </p>
        <div>
          {isAuthenticated ? (
            <button onClick={logout}>Cerrar Sesión</button>
          ) : (
            <>
              <button onClick={login}>Ingreso</button>
              <button>Registrarse</button> {/* Puedes manejar el registro por separado */}
            </>
          )}
        </div>
      </Aside>
      <Main />
      <Footer />
     
    </div>
  );
};

export default Home;
