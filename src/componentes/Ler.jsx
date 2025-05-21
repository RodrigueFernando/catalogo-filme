import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Ler() {
  const { id } = useParams(); // Pega o ID do filme na URL
  const navigate = useNavigate(); // Função para navegação entre páginas

  const [filme, setFilme] = useState(null); // Estado para armazenar os dados do filme
  const [erro, setErro] = useState(false); // Estado para gerenciar erros

  // Effect para buscar os dados do filme na API quando o ID mudar
  useEffect(() => {
    axios.get(`https://682b6df1d29df7a95be35de0.mockapi.io/users/${id}`)
      .then(res => setFilme(res.data))  // Se encontrar, armazena os dados do filme
      .catch(() => setErro(true));  // Se houver erro, define erro como true
  }, [id]);

  // Exibe mensagem de erro se o filme não for encontrado
  if (erro) {
    return (
      <div className="container mt-4">
        <h1>Filme não encontrado</h1>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Voltar para Início</button>
      </div>
    );
  }

  // Exibe mensagem de carregamento enquanto os dados do filme estão sendo carregados
  if (!filme) {
    return <div className="container mt-4">Carregando filme...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Detalhes do Filme</h1> 
      <p><strong>ID:</strong> {filme.id}</p>
      <p><strong>Nome:</strong> {filme.nome}</p> 
      <p><strong>Gênero:</strong> {filme.genero}</p>
      <p><strong>Ano:</strong> {filme.anos}</p> 



      <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Cancelar</button>
    
    </div>
  );
}

export default Ler;
