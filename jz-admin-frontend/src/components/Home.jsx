//crear la pagina home del jardin infantes con un header ,un main, un footer y un aside con un menu de navegaciony ademas un boton ingreso y un boton registrarse

import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Aside from './Aside'
import Nav from './Nav'
import Button from './Button'
import '../styles/Home.css'

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Aside>
          <Nav />
        </Aside>
        <Main />
      </div>
      <Footer />
    </>
  )
}

export default Home
