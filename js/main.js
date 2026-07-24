// Importa os módulos e liga os event listeners da página de juros compostos.

import { calcularJurosCompostos } from './calculos.js';
import { lerFormulario, renderResultado, renderGrafico } from './dom.js';

const form = document.getElementById('form-calculadora');
const canvas = document.getElementById('grafico-evolucao');

const elementosResultado = {
  painelResultado: document.getElementById('painel-resultado'),
  valorFinal: document.getElementById('resultado-valor-final'),
  totalInvestido: document.getElementById('resultado-total-investido'),
  totalJuros: document.getElementById('resultado-total-juros'),
  valorInicial: document.getElementById('resultado-valor-inicial'),
  periodo: document.getElementById('resultado-periodo'),
};

function calcularEExibir(event, { rolar = true } = {}) {
  event.preventDefault();

  const { valorInicial, aporteMensal, taxaMensal, meses } = lerFormulario(form);

  if (meses <= 0) {
    return;
  }

  const resultado = calcularJurosCompostos({ valorInicial, taxaMensal, meses, aporteMensal });

  renderResultado(elementosResultado, resultado, meses, valorInicial);
  renderGrafico(canvas, resultado.evolucao);

  if (rolar) {
    elementosResultado.painelResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

form.addEventListener('submit', calcularEExibir);

// Calcula automaticamente com os valores padrão ao carregar a página, sem rolar a tela.
calcularEExibir(new Event('submit'), { rolar: false });
