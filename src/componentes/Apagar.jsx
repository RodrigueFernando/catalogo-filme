import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Apagar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    axios.get('https://682b6df1d29df7a95be35de0.mockapi.io/users/' + id)
      .then(res => setFilme(res.data))
      .catch(err => {
        console.error(err);
        setErro(true);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete('https://682b6df1d29df7a95be35de0.mockapi.io/users/' + id)
      .then(() => navigate('/'))
      .catch(err => console.error('Erro ao apagar:', err));
  };

  if (erro) {
    return (
      <div className="container mt-4">
        <h1>Filme não encontrado</h1>
        <Link to="/" className="btn btn-secondary mt-3">Voltar para Início</Link>
      </div>
    );
  }

  if (!filme) {
    return <div className="container mt-4">Carregando dados do filme...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Apagar Filme</h1>
      <p><strong>Nome:</strong> {filme.nome}</p>
      <p><strong>Gênero:</strong> {filme.genero}</p>
      <p><strong>Ano:</strong> {filme.anos}</p>
      

      <p className="text-danger">Tem certeza que deseja apagar este filme?</p>

      <button className="btn btn-danger me-2" onClick={handleDelete}>Apagar</button>
      <Link to="/" className="btn btn-secondary">Cancelar</Link>
    </div>
  );
}

export default Apagar;
