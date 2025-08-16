/**
 * Remove qualquer caractere que não seja número
 */
export function sanitizeCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}

/**
 * Valida CNPJ
 * - Remove máscara
 * - Verifica tamanho (14 dígitos)
 * - Valida dígitos verificadores
 */
export function isValidCnpj(cnpj: string): boolean {
  cnpj = sanitizeCnpj(cnpj);

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs com todos os dígitos iguais (ex.: 00000000000000)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}