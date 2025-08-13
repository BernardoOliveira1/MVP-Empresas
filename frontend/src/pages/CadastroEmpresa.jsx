import EmpresaForm from "../components/EmpresaForm";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CadastroEmpresa() {
  const navigate = useNavigate();

  const salvarEmpresa = async (data) => {
    try {
      await api.post("/empresas", data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar empresa", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Empresa</h2>
      <EmpresaForm onSubmit={salvarEmpresa} />
    </div>
  );
}
