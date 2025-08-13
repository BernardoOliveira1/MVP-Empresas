import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import EmpresaForm from "../components/EmpresaForm";

export default function EditarEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const carregarEmpresa = async () => {
      try {
        const response = await api.get(`/empresas/${id}`);
        setEmpresa(response.data);
      } catch (error) {
        console.error("Erro ao carregar empresa", error);
      }
    };
    carregarEmpresa();
  }, [id]);

  const atualizarEmpresa = async (data) => {
    try {
      await api.patch(`/empresas/${id}`, data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar empresa", error);
    }
  };

  if (!empresa) return <p>Carregando...</p>;

  return (
    <div className="container mt-4">
      <h2>Editar Empresa</h2>
      <EmpresaForm onSubmit={atualizarEmpresa} empresa={empresa} />
    </div>
  );
}
