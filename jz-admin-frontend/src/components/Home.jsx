//crear la pagina home del jardin infantes con un header ,un main, un footer y un aside con un menu de navegaciony ademas un boton ingreso y un boton registrarse

import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Aside from './Aside';
import Nav from './Nav';
import Button from './Button';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="container">
            <Header />
            <Aside>
                <Nav />
            </Aside>
            <Main />
            <Footer />
            <Button text="Ingresar" />
            <Button text="Registrarse" />
        </div>
    );
    }

    export default Home;