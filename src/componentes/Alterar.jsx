// src/components/Alterar.js
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useItemById from './userItemById';

function Alterar() {
    const { id: idFromUrl } = useParams();
    const navigate = useNavigate();

    const { 
        item: filme, 
        status: pageStatus, 
        error, 
        fetchItem: buscarFilme,
        setItem: setFilme 
    } = useItemById('https://682b6df1d29df7a95be35de0.mockapi.io/users');

    const [idInput, setIdInput] = useState(idFromUrl || '');

    // handle change para os inputs do formulário de edição
    const handleChange = (e) => {
        // Esta atualização de estado para 'filme' utiliza a forma direta (setState(novoObjeto)).
        // Cria uma nova cópia do objeto 'filme' e atualiza a propriedade específica,
        // garantindo que o React detecte a mudança e re-renderize.
        // É a forma padrão e segura para atualizar objetos de estado.
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
            return;
        }

        try {
            await axios.put(`https://682b6df1d29df7a95be35de0.mockapi.io/users/${filme.id}`, filme);
            alert('Filme alterado com sucesso!');
            navigate('/');
        } catch (err) {
            console.error('Erro ao alterar filme:', err);
            alert('Erro ao alterar filme. Tente novamente.');
            buscarFilme(idInput);
        }
    };

    // Lida com o botão "Cancelar" (volta para Inicio)
    const handleCancel = () => {
        navigate('/');
    };

    // --- Renderização Condicional ---

    if (pageStatus === 'inicial' || pageStatus === 'nao-encontrado' || pageStatus === 'erro') {
        let mensagemAdicional = '';
        if (pageStatus === 'nao-encontrado') {
            mensagemAdicional = 'Filme não encontrado com o ID fornecido. Por favor, tente outro ID.';
        } else if (pageStatus === 'erro') {
            mensagemAdicional = error ? `Erro: ${error.message}` : 'Ocorreu um erro na comunicação. Por favor, tente novamente.';
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
                            
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-primary me-2">Procurar</button>
                  
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        );
    }

    if (pageStatus === 'carregando') {
        return <div className="container mt-4">Carregando dados do filme...</div>;
    }

    if (pageStatus === 'encontrado' && filme) {
        return (
            <div className="container mt-4">
                <h1>Alterar Filme</h1>
                <form onSubmit={handleAlterar}>
                    <div className="mb-3">
                        <label>ID do Filme</label>
                        <input type="text" value={filme.id} className="form-control" readOnly />
                    </div>
                    <div className="mb-3">
                        <label>Nome do Filme</label>
                        <input type="text" name="nome" value={filme.nome || ''} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label>Gênero</label>
                        <input type="text" name="genero" value={filme.genero || ''} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label>Ano</label>
                        <input type="number" name="ano" value={filme.anos || ''} onChange={handleChange} className="form-control" required />
                    </div>

                
                    <button type="submit" className="btn btn-primary me-2">Alterar</button>
                   
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