//crear la pagina home del jardin infantes con un header ,un main, un footer y un aside con un menu de navegaciony ademas un boton ingreso y un boton registrarse

import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Aside from '../components/Aside'
import Nav from '../components/Nav'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Aside>
        <Nav />
      </Aside>
      <Main />
      <Footer />
    </div>
  )
}

export default Home
