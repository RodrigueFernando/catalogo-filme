import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Criar() {
  const navigate = useNavigate();

  const [filme, setFilme] = useState({
    nome: '',
    genero: '',
    ano: ''
  });

  const handleChange = (e) => {
    setFilme({ ...filme, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://682b6df1d29df7a95be35de0.mockapi.io/users', filme)
      .then(() => navigate('/')) 
      .catch(err => console.log('Erro ao criar filme:', err));
  };

  return (
    <div className="container mt-4">
      <h1>Criar Novo Filme</h1>

  
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome do Filme</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={filme.nome}
            onChange={handleChange}
        
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gênero</label>
          <input
            type="text"
            name="genero"
            className="form-control"
            value={filme.genero}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ano</label>
          <input
            type="number"
            name="ano"
            className="form-control"
            value={filme.ano}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-2">Criar</button>
       
       

        <Link to="/" className="btn btn-secondary">Cancelar</Link>
      </form>
    </div>
  );
}

export default Criar;
