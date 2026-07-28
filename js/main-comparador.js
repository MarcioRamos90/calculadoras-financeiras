// Importa os módulos e liga os event listeners da página comparadora de juros simples vs. compostos.

import { calcularJurosCompostos, calcularJurosSimples } from './calculos.js';
import { lerFormularioComparador, renderResultadoComparador, renderGraficoComparador } from './dom.js';

const form = document.getElementById('form-calculadora');
const canvas = document.getElementById('grafico-evolucao');

const elementosResultado = {
  painelResultado: document.getElementById('painel-resultado'),
  valorFinalComposto: document.getElementById('resultado-valor-final-composto'),
  valorFinalSimples: document.getElementById('resultado-valor-final-simples'),
  diferenca: document.getElementById('resultado-diferenca'),
  periodo: document.getElementById('resultado-periodo'),
};

function calcularEExibir(event, { rolar = true } = {}) {
  event.preventDefault();

  const { valorInicial, taxaMensal, meses } = lerFormularioComparador(form);

  if (meses <= 0) {
    return;
  }

  const resultadoComposto = calcularJurosCompostos({ valorInicial, taxaMensal, meses, aporteMensal: 0 });
  const resultadoSimples = calcularJurosSimples({ valorInicial, taxaMensal, meses });

  renderResultadoComparador(elementosResultado, resultadoSimples, resultadoComposto, meses);
  renderGraficoComparador(canvas, resultadoSimples.evolucao, resultadoComposto.evolucao);

  if (rolar) {
    elementosResultado.painelResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

form.addEventListener('submit', calcularEExibir);

// Calcula automaticamente com os valores padrão ao carregar a página, sem rolar a tela.
calcularEExibir(new Event('submit'), { rolar: false });
