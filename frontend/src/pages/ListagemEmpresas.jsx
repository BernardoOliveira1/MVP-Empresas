import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ListagemEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarEmpresas();
  }, []);

  const carregarEmpresas = async () => {
    try {
      const response = await api.get("/empresas");
      setEmpresas(response.data);
    } catch (error) {
      console.error("Erro ao carregar empresas", error);
    }
  };

  const excluirEmpresa = async (id) => {
    // if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      await api.delete(`/empresas/${id}`);
      carregarEmpresas();
    } catch (error) {
      console.error("Erro ao excluir empresa", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Empresas</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/cadastrar")}
      >
        Cadastrar Nova Empresa
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Nome Fantasia</th>
            <th>Endereço</th>
            <th>Criado Em</th>
            <th>Alterado Em</th>
            {/* <th>Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.name}</td>
              <td>{empresa.cnpj}</td>
              <td>{empresa.fantasyName}</td>
              <td>{empresa.address}</td>
              <td>{empresa.createdAt}</td>
              <td>{empresa.updatedAt}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/editar/${empresa.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => excluirEmpresa(empresa.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
