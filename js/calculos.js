// Lógica pura de cálculo financeiro — sem tocar o DOM, fácil de testar isoladamente.

/**
 * Calcula a evolução de um investimento com juros compostos e aportes mensais.
 * @param {Object} params
 * @param {number} params.valorInicial - valor investido no mês 0
 * @param {number} params.taxaMensal - taxa de juros ao mês, em decimal (ex: 0.01 = 1%)
 * @param {number} params.meses - número total de meses da simulação
 * @param {number} params.aporteMensal - valor investido ao final de cada mês
 * @returns {{ valorFinal: number, totalInvestido: number, totalJuros: number, evolucao: Array }}
 */
export function calcularJurosCompostos({ valorInicial, taxaMensal, meses, aporteMensal }) {
  let saldo = valorInicial;
  let investido = valorInicial;
  const evolucao = [{ mes: 0, saldo, investido }];

  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo * (1 + taxaMensal) + aporteMensal;
    investido += aporteMensal;
    evolucao.push({ mes, saldo, investido });
  }

  const valorFinal = saldo;
  const totalInvestido = investido;
  const totalJuros = valorFinal - totalInvestido;

  return { valorFinal, totalInvestido, totalJuros, evolucao };
}

/** Converte uma taxa anual (%) para a taxa mensal equivalente (decimal). */
export function taxaAnualParaMensal(taxaAnualPercentual) {
  return Math.pow(1 + taxaAnualPercentual / 100, 1 / 12) - 1;
}

/** Converte uma taxa em percentual (ex: 1.5) para decimal (ex: 0.015). */
export function percentualParaDecimal(valorPercentual) {
  return valorPercentual / 100;
}

/** Converte anos em meses. */
export function anosParaMeses(anos) {
  return anos * 12;
}

/** Converte uma taxa nominal mensal em taxa real mensal, descontando a inflação (equação de Fisher). */
export function taxaRealMensal(taxaNominalMensal, taxaInflacaoMensal) {
  return (1 + taxaNominalMensal) / (1 + taxaInflacaoMensal) - 1;
}

/**
 * Calcula a evolução de um investimento com juros simples (sem aportes).
 * @param {Object} params
 * @param {number} params.valorInicial
 * @param {number} params.taxaMensal - taxa de juros ao mês, em decimal
 * @param {number} params.meses
 * @returns {{ valorFinal: number, totalJuros: number, evolucao: Array }}
 */
export function calcularJurosSimples({ valorInicial, taxaMensal, meses }) {
  const evolucao = [];
  for (let mes = 0; mes <= meses; mes++) {
    evolucao.push({ mes, saldo: valorInicial * (1 + taxaMensal * mes) });
  }

  const valorFinal = evolucao[evolucao.length - 1].saldo;
  const totalJuros = valorFinal - valorInicial;

  return { valorFinal, totalJuros, evolucao };
}
