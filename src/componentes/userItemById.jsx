// src/hooks/useItemById.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// hook para buscar um item por ID 
function useItemById(baseUrl) {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState('inicial'); // 'inicial', 'carregando', 'encontrado', 'nao-encontrado', 'erro'
    const [error, setError] = useState(null);

    const fetchItem = useCallback(async (id) => {
        // As atualizações de estado abaixo usam a forma direta (setState(novoValor)).
        // Esta forma é adequada porque o novo estado (ex: 'carregando', null)
        // não depende do valor anterior do estado para ser calculado.
        // O novo valor é um valor fixo ou um resultado direto de uma operação.
        setStatus('carregando'); 
        setItem(null); 
        setError(null); 

        if (!id) {
            setStatus('inicial'); // Retorna ao status inicial se o ID for vazio
            return;
        }

        try {
            const response = await axios.get(`${baseUrl}/${id}`);
            if (response.data && Object.keys(response.data).length > 0 && response.data.id) {
                setItem(response.data); 
                setStatus('encontrado'); 
            } else {
                setItem(null); 
                setStatus('nao-encontrado'); 
            }
        } catch (err) {
            console.error("Erro ao buscar item:", err);
            setError(err); 
            setStatus('erro'); 
        }
    }, [baseUrl]);

    // setItem é retornado para permitir que os componentes que usam este hook
    // possam editar o item diretamente (como a página Alterar).
    return { item, status, error, fetchItem, setItem }; 
}

export default useItemById;