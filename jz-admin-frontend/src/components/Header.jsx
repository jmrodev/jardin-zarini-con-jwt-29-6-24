//header

import React from 'react';
import logo from '../images/logo.png';
import Button from './Button';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="logo" className="header__logo" />
            <Button text="Ingreso" />
            <Button text="Registrarse" />
        </header>
    );
}

export default Header;