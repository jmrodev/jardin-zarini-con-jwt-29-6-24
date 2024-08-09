//header

import React from 'react'
import logo from '../images/logo.png'
import Button from './Button'
import '../styles/Header.css'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }


  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <h1 className="header__title">Jardin de infantes</h1>
      <section className=' button__section'>
        <Button text="Ingreso" onClick={() => handleNavigate('/login')} />
        <Button text="Registrarse" onClick={() => handleNavigate('/register')} />
        <Button text="Estudiantes" onClick={() => handleNavigate('/students')} />
      </section>
    </header>
  )
}

export default Header
