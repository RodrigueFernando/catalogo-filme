import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useItemById from './userItemById'; // Ajuste esse caminho se necessário

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
        const { name, value } = e.target;
        // Converte o campo "anos" para número ao atualizar
        const newValue = name === 'anos' ? parseInt(value) || '' : value;
        setFilme({ ...filme, [name]: newValue });
    };

    const handleProcurar = (e) => {
        e.preventDefault();
        buscarFilme(idInput);
    };

    const handleAlterar = async (e) => {
        e.preventDefault();
        if (!filme || !filme.id) {
            alert('Dados do filme incompletos.');
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

   
    const handleCancel = () => {
        navigate('/');
    };

    // --- Renderização Condicional ---

    if (pageStatus === 'inicial' || pageStatus === 'nao-encontrado' || pageStatus === 'erro') {
        let mensagem = '';
        if (pageStatus === 'nao-encontrado') {
            mensagem = 'Filme não encontrado com o ID fornecido.';
        } else if (pageStatus === 'erro') {
            mensagem = error ? `Erro: ${error.message}` : 'Erro ao carregar dados.';
        }

        return (
            <div className="container mt-4">
                <h1>Alterar Filme</h1>
                {mensagem && <p className="text-danger">{mensagem}</p>}
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
                            value={filme.ano || ''}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success me-2">Alterar</button>
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
