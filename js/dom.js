// Leitura de inputs e escrita de resultados no DOM — única camada que toca o HTML.

import { taxaAnualParaMensal, percentualParaDecimal, anosParaMeses } from './calculos.js';
import { formatarMoeda, formatarPeriodo } from './formatador.js';

/** Lê e normaliza os valores do formulário da calculadora de juros compostos. */
export function lerFormulario(form) {
  const valorInicial = Number(form.valorInicial.value) || 0;
  const aporteMensal = Number(form.aporteMensal.value) || 0;
  const taxaValor = Number(form.taxaValor.value) || 0;
  const taxaPeriodo = form.taxaPeriodo.value; // 'mensal' | 'anual'
  const tempoValor = Number(form.tempoValor.value) || 0;
  const tempoPeriodo = form.tempoPeriodo.value; // 'meses' | 'anos'

  const taxaMensal =
    taxaPeriodo === 'anual'
      ? taxaAnualParaMensal(taxaValor)
      : percentualParaDecimal(taxaValor);

  const meses = tempoPeriodo === 'anos' ? anosParaMeses(tempoValor) : tempoValor;

  return { valorInicial, aporteMensal, taxaMensal, meses };
}

/** Preenche os cartões de resultado com os valores calculados. */
export function renderResultado(elementos, resultado, meses, valorInicial) {
  elementos.valorFinal.textContent = formatarMoeda(resultado.valorFinal);
  elementos.totalInvestido.textContent = formatarMoeda(resultado.totalInvestido);
  elementos.totalJuros.textContent = formatarMoeda(resultado.totalJuros);
  elementos.valorInicial.textContent = formatarMoeda(valorInicial);
  elementos.periodo.textContent = formatarPeriodo(meses);
  elementos.painelResultado.hidden = false;
}

let grafico = null;

/** Desenha (ou atualiza) o gráfico de evolução do investimento usando Chart.js. */
export function renderGrafico(canvas, evolucao) {
  const passo = Math.max(1, Math.ceil(evolucao.length / 24));
  const pontos = evolucao.filter((_, i) => i % passo === 0 || i === evolucao.length - 1);

  const labels = pontos.map((p) => `${p.mes}m`);
  const saldos = pontos.map((p) => Number(p.saldo.toFixed(2)));
  const investidos = pontos.map((p) => Number(p.investido.toFixed(2)));

  const dados = {
    labels,
    datasets: [
      {
        label: 'Saldo total',
        data: saldos,
        borderColor: '#0f766e',
        backgroundColor: 'rgba(15, 118, 110, 0.12)',
        fill: true,
        tension: 0.25,
        pointRadius: 0,
      },
      {
        label: 'Total investido',
        data: investidos,
        borderColor: '#94a3b8',
        borderDash: [4, 4],
        fill: false,
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };

  const opcoes = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: {
        ticks: {
          callback: (valor) =>
            valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }),
        },
      },
    },
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  if (grafico) {
    grafico.data = dados;
    grafico.update();
    return;
  }

  grafico = new Chart(canvas, { type: 'line', data: dados, options: opcoes });
}
