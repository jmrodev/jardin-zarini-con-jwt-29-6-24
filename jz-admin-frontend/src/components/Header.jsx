//header

import React from 'react'
import logo from '../images/logo.png'
import Button from './Button'
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <h1 className="header__title">Jardin de infantes</h1>
      <section className=' button__section'>
        <Button text="Ingreso" />
        <Button text="Registrarse" />
      </section>
    </header>
  )
}

export default Header
