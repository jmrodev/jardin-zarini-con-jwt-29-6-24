import {React } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Aside from '../components/Aside';
import Nav from '../components/Nav';
import '../styles/Home.css';
import LoginForm from '../components/LoginForm';

const Student = () => {


    return (
        <div className="container">
            <Header />
            <Aside>
                <Nav />
                <LoginForm />
            </Aside>
            <Main />
            <Footer />
        </div>
    );
    
    }

export default Student;
