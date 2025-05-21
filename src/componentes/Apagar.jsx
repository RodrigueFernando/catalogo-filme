import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useItemById from './userItemById'; // Certifique-se de que o hook está correto

function Apagar() {
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

    const handleProcurar = (e) => {
        e.preventDefault();
        buscarFilme(idInput);
    };

    const handleChange = (e) => {
        setFilme({ ...filme, [e.target.name]: e.target.value });
    };

    const handleApagar = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`https://682b6df1d29df7a95be35de0.mockapi.io/users/${filme.id}`);
            alert('Filme apagado com sucesso!');
            navigate('/');
        } catch (err) {
            alert('Erro ao apagar o filme. Tente novamente.');
            console.error(err);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    // 🔍 Tela inicial ou erro
    if (pageStatus === 'inicial' || pageStatus === 'nao-encontrado' || pageStatus === 'erro') {
        let mensagem = '';
        if (pageStatus === 'nao-encontrado') {
            mensagem = 'Filme não encontrado com o ID fornecido.';
        } else if (pageStatus === 'erro') {
            mensagem = error ? `Erro: ${error.message}` : 'Erro na comunicação com o servidor.';
        }

        return (
            <div className="container mt-4">
                <h1>Procurar Filme</h1>
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
                <h1>Apagar Filme</h1>
                <form onSubmit={handleApagar}>
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
                            name="anos" // ou "ano", dependendo do nome real no backend
                            value={filme.anos || ''} // ou filme.ano
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <p className="text-danger">Tem certeza que deseja apagar? Esta ação não pode ser desfeita.</p>

                    <button type="submit" className="btn btn-danger me-2">Apagar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        );
    }

    return <div className="container mt-4">Estado desconhecido.</div>;
}

export default Apagar;
