// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    axios.get('https://682b6df1d29df7a95be35de0.mockapi.io/users')
      .then(response => {
        setFilmes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">CATÁLOGO DE FILMES</h1>
      
      {/* Menu de navegação com os botões no topo */}
      <div className="d-flex justify-content-center mb-4">
        <Link to="/" className="btn btn-outline-dark mx-1">INÍCIO</Link>
        <Link to="/Criar" className="btn btn-outline-dark mx-1">CRIAR</Link>
        {filmes.length > 0 && (
          <>
            <Link to={`/Alterar/${filmes[0].id}`} className="btn btn-outline-dark mx-1">ALTERAR</Link>
            <Link to={`/Apagar/${filmes[0].id}`} className="btn btn-outline-dark mx-1">APAGAR</Link>
          </>
        )}
      </div>

     {filmes.map((filme) => (
        <Link 
          key={filme.id} 
          to={`/Ler/${filme.id}`} 
          className="text-decoration-none"
        >
          <div className="border p-2 rounded mb-2 text-dark">
            <strong>Id:</strong> {filme.id} &nbsp;&nbsp;
            <strong>Nome:</strong> {filme.nome} &nbsp;
            
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;