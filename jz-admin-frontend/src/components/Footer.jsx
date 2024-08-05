// crear footer

import React from 'react'
import '../styles/Footer.css'
import logo from '../images/logo.png'

const Footer = () => {
  return (
    <footer>
      <section className="brand">
        <figure>
          <img src={logo} className="logo-footer" />
        </figure>
      </section>
      <section>
        <address>
          Telefono : <a href="tel:+1234567890">+1234567890</a>
          E-Mail : <a href="mailto:info@domain.com"> info@domain.com</a>
        </address>
      </section>
    </footer>
  )
}

export default Footer
