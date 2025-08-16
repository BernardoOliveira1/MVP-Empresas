import { sanitizeCnpj, isValidCnpj } from "../../utils/cnpj-utils.ts";

export default function CnpjInput({ value, onChange, touched, ...props }) {
  const formatCnpj = (val) => {
    val = sanitizeCnpj(val);
    val = val.replace(/^(\d{2})(\d)/, "$1.$2");
    val = val.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    val = val.replace(/\.(\d{3})(\d)/, ".$1/$2");
    val = val.replace(/(\d{4})(\d)/, "$1-$2");
    return val;
  };

  const handleChange = (e) => {
    const formatted = formatCnpj(e.target.value);
    onChange({
      ...e,
      target: {
        ...e.target,
        value: formatted,
      },
    });
  };

  const showError = touched && !isValidCnpj(value);
  console.log("showError: ", showError);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={`form-control ${showError ? "is-invalid" : ""}`}
        {...props}
      />
      {showError && <div style={{ color: "red" }}>CNPJ inválido</div>}
    </div>
  );
}
