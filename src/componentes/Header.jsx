import React from 'react';
import { Link } from 'react-router-dom';
//import './Header.css'; // Importe o arquivo CSS

function Header() {
  return (
    <header className="header">
      <h2>CATÁLOGO DE FILMES</h2>
      <ul>
        <li><Link to="/">INÍCIO</Link></li>
        <li><Link to="/Criar">CRIAR</Link></li>
        <li><Link to="/Alterar">ALTERAR</Link></li>
        <li><Link to="/Apagar">APAGAR</Link></li>
      </ul>
    </header>
  );
}

export default Header;