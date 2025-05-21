import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import axios from 'axios';

function Alterar() {
    const { id: idFromUrl } = useParams(); 
    const navigate = useNavigate();

    // Estados
    const [filme, setFilme] = useState(null); // Armazena os dados do filme
    const [idInput, setIdInput] = useState(idFromUrl || ''); // Armazena o ID digitado pelo usuário
    
    // Estado para controlar a renderização:
    // 'aguardando-id': Estado inicial, exibe apenas o campo para digitar o ID
    // 'carregando': Exibe mensagem de carregamento durante a busca
    // 'nao-encontrado': Mensagem específica para ID não encontrado
    // 'erro': Mensagem de erro geral na comunicação
    // 'exibir-form': Exibe o formulário de alteração com os dados do filme
    const [pageStatus, setPageStatus] = useState('aguardando-id');

    

    
    const buscarFilme = async (idParaBuscar) => {
        setPageStatus('carregando'); 
        setFilme(null); 

        if (!idParaBuscar) {
            setPageStatus('aguardando-id'); // Volta para o input se o ID for vazio
            return;
        }

        try {
            const response = await axios.get(`https://682b6df1d29df7a95be35de0.mockapi.io/users/${idParaBuscar}`);
            
          
            if (response.data && Object.keys(response.data).length > 0 && response.data.id) {
                setFilme(response.data);
                setPageStatus('exibir-form'); 
            } else {
                setFilme(null); 
                setPageStatus('nao-encontrado'); 
            }
        } catch (error) {
            console.error("Erro ao buscar filme:", error);
            setFilme(null); 
            setPageStatus('erro'); 
        }
    };


    const handleChange = (e) => {
        setFilme({ ...filme, [e.target.name]: e.target.value });
    };

  
    const handleProcurar = (e) => {
        e.preventDefault(); 
        buscarFilme(idInput);
    };

   
    const handleAlterar = async (e) => {
        e.preventDefault(); 

       
        if (!filme || !filme.id) {
            console.error('Dados do filme incompletos para alteração.');
            setPageStatus('erro'); 
        }

        try {
            await axios.put(`https://682b6df1d29df7a95be35de0.mockapi.io/users/${filme.id}`, filme);
            alert('Filme alterado com sucesso!');
            navigate('/'); 
        } catch (error) {
            console.error('Erro ao alterar filme:', error);
            alert('Erro ao alterar filme. Tente novamente.');
            setPageStatus('erro');
        }
    };

    // Lida com o botão "Cancelar" (volta para Inicio)
    const handleCancel = () => {
        navigate('/'); 
    };

    // --- Renderização Condicional 

    // REGRA 1: Exibir apenas uma caixa para digitar o id do filme
    // (Este é o estado inicial, ou se um erro ou não-encontrado ocorrer)
    if (pageStatus === 'aguardando-id' || pageStatus === 'nao-encontrado' || pageStatus === 'erro') {
        let mensagemAdicional = '';
        if (pageStatus === 'nao-encontrado') {
            mensagemAdicional = 'Filme não encontrado com o ID fornecido. Por favor, tente outro ID.';
        } else if (pageStatus === 'erro') {
            mensagemAdicional = 'Ocorreu um erro na comunicação. Por favor, tente novamente.';
        }

        return (
            <div className="container mt-4">
                <h1>Alterar Filme</h1>
                {mensagemAdicional && <p className="text-danger">{mensagemAdicional}</p>}
                <form onSubmit={handleProcurar}>
                    <div className="mb-3">
                        <label htmlFor="idFilme">Digite o ID do Filme</label>
                        <input
                            type="text"
                            id="idFilme"
                            className="form-control"
                            value={idInput}
                            onChange={(e) => setIdInput(e.target.value)}
                            placeholder="Ex: 123"
                            required
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-primary me-2">Procurar</button>
                  
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        );
    }

    // REGRA: Se achar os dados, exibir num formulário (e botões Altera/Cancela)
    if (pageStatus === 'exibir-form' && filme) { // Garante que 'filme' não é null aqui
        return (
            <div className="container mt-4">
                <h1>Alterar Filme</h1>
                <form onSubmit={handleAlterar}>
                    <div className="mb-3">
                        <label>ID do Filme</label>
                        <input
                            type="text"
                            value={filme.id}
                            className="form-control"
                            readOnly 
                        />
                    </div>
                    <div className="mb-3">
                        <label>Nome do Filme</label>
                        <input
                            type="text"
                            name="nome"
                            value={filme.nome || ''} 
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Gênero</label>
                        <input
                            type="text"
                            name="genero"
                            value={filme.genero || ''} 
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Ano</label>
                        <input
                            type="number"
                            name="ano"
                            value={filme.anos || ''} 
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Botões altera (grava os dados e volta para Inicio) */}
                    <button type="submit" className="btn btn-primary me-2">Alterar</button>
                    {/* Botões cancela (volta para Inicio) */}
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        );
    }
    
    // REGRA: Se está carregando
    if (pageStatus === 'carregando') {
        return <div className="container mt-4">Carregando dados do filme...</div>;
    }

    // Fallback genérico para estados inesperados (não deve ser alcançado em uso normal)
    return <div className="container mt-4">Estado desconhecido.</div>;
}

export default Alterar;