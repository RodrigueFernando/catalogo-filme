import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Iniciar from './componentes/Iniciar';
import Criar from './componentes/Criar';
import Alterar from './componentes/Alterar';
import Apagar from './componentes/Apagar';
import Ler from './componentes/Ler';
import Header from './componentes/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Iniciar />} />
          <Route path="/criar" element={<Criar />} />
          <Route path="/ler/:id" element={<Ler />} />
          <Route path="/alterar/:id" element={<Alterar />} />
          <Route path="/apagar/:id" element={<Apagar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;