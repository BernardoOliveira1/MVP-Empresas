import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListagemEmpresas from "./pages/ListagemEmpresas";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import EditarEmpresa from "./pages/EditarEmpresa";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ListagemEmpresas />} />
          <Route path="/cadastrar" element={<CadastroEmpresa />} />
          <Route path="/editar/:id" element={<EditarEmpresa />} />
        </Routes>
      </div>
    </Router>
  );
}
