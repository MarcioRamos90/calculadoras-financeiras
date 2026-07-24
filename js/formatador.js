// Funções de formatação (moeda, percentual) — reaproveitadas por todas as calculadoras.

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/** Formata um número como moeda brasileira (ex: 1234.5 -> "R$ 1.234,50"). */
export function formatarMoeda(valor) {
  return formatadorMoeda.format(valor);
}

/** Formata um número como percentual com casas decimais fixas (ex: 1.5 -> "1,50%"). */
export function formatarPercentual(valor, casas = 2) {
  return `${valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })}%`;
}

/** Converte um número de meses em um texto legível (ex: 18 -> "1 ano e 6 meses"). */
export function formatarPeriodo(meses) {
  const anos = Math.floor(meses / 12);
  const mesesRestantes = meses % 12;

  if (anos === 0) return `${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
  if (mesesRestantes === 0) return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
}
