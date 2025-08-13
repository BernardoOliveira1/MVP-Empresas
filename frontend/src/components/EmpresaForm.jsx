import { useState } from "react";

export default function EmpresaForm({ onSubmit, empresa }) {
  const [formData, setFormData] = useState({
    name: empresa?.name || "",
    cnpj: empresa?.cnpj || "",
    fantasyName: empresa?.fantasyName || "",
    address: empresa?.address || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">CNPJ</label>
        <input
          type="text"
          className="form-control"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nome Fantasia</label>
        <input
          type="text"
          className="form-control"
          name="fantasyName"
          value={formData.fantasyName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Endereço</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success">
        Salvar
      </button>
    </form>
  );
}
