// Importa os módulos e liga os event listeners da página de juros compostos com inflação.

import { calcularJurosCompostos, taxaRealMensal } from './calculos.js';
import { lerFormularioInflacao, renderResultadoInflacao, renderGraficoInflacao } from './dom.js';

const form = document.getElementById('form-calculadora');
const canvas = document.getElementById('grafico-evolucao');

const elementosResultado = {
  painelResultado: document.getElementById('painel-resultado'),
  valorFinalReal: document.getElementById('resultado-valor-final-real'),
  valorFinalNominal: document.getElementById('resultado-valor-final-nominal'),
  perdaInflacao: document.getElementById('resultado-perda-inflacao'),
  totalInvestido: document.getElementById('resultado-total-investido'),
  periodo: document.getElementById('resultado-periodo'),
};

function calcularEExibir(event, { rolar = true } = {}) {
  event.preventDefault();

  const { valorInicial, aporteMensal, taxaMensal, meses, inflacaoMensal } = lerFormularioInflacao(form);

  if (meses <= 0) {
    return;
  }

  const resultadoNominal = calcularJurosCompostos({ valorInicial, taxaMensal, meses, aporteMensal });

  const taxaReal = taxaRealMensal(taxaMensal, inflacaoMensal);
  const resultadoReal = calcularJurosCompostos({ valorInicial, taxaMensal: taxaReal, meses, aporteMensal });

  renderResultadoInflacao(elementosResultado, resultadoNominal, resultadoReal, meses);
  renderGraficoInflacao(canvas, resultadoNominal.evolucao, resultadoReal.evolucao);

  if (rolar) {
    elementosResultado.painelResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

form.addEventListener('submit', calcularEExibir);

// Calcula automaticamente com os valores padrão ao carregar a página, sem rolar a tela.
calcularEExibir(new Event('submit'), { rolar: false });
