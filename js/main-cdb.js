// Importa os módulos e liga os event listeners da página de rentabilidade de CDB.

import { calcularJurosCompostos, aliquotaIR } from './calculos.js';
import { lerFormularioCDB, renderResultadoCDB, renderGrafico } from './dom.js';

const form = document.getElementById('form-calculadora');
const canvas = document.getElementById('grafico-evolucao');

const elementosResultado = {
  painelResultado: document.getElementById('painel-resultado'),
  valorFinalLiquido: document.getElementById('resultado-valor-final-liquido'),
  valorFinalBruto: document.getElementById('resultado-valor-final-bruto'),
  impostoDevido: document.getElementById('resultado-imposto-devido'),
  jurosLiquidos: document.getElementById('resultado-juros-liquidos'),
  periodo: document.getElementById('resultado-periodo'),
};

function calcularEExibir(event, { rolar = true } = {}) {
  event.preventDefault();

  const { valorInicial, taxaMensal, meses, dias } = lerFormularioCDB(form);

  if (meses <= 0) {
    return;
  }

  const resultado = calcularJurosCompostos({ valorInicial, taxaMensal, meses, aporteMensal: 0 });
  const aliquota = aliquotaIR(dias);

  renderResultadoCDB(elementosResultado, resultado, aliquota, meses);
  renderGrafico(canvas, resultado.evolucao);

  if (rolar) {
    elementosResultado.painelResultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

form.addEventListener('submit', calcularEExibir);

// Calcula automaticamente com os valores padrão ao carregar a página, sem rolar a tela.
calcularEExibir(new Event('submit'), { rolar: false });
