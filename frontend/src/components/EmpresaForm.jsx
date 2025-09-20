import { useState } from "react";
import CnpjInput from "./CNPJInput";
import { isValidCnpj } from "../utils/cnpj-utils.ts";

export default function EmpresaForm({ onSubmit, empresa }) {
  const [formData, setFormData] = useState({
    name: empresa?.name || "",
    cnpj: empresa?.cnpj || "",
    fantasyName: empresa?.fantasyName || "",
    address: empresa?.address || "",
  });
  const [cnpjTouched, setCnpjTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCnpjTouched(true);

    if (!isValidCnpj(formData.cnpj)) return;
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <CnpjInput
          className="form-control"
          name="cnpj"
          value={formData.cnpj}
          onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
          touched={cnpjTouched}
          onBlur={() => setCnpjTouched(true)}
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
