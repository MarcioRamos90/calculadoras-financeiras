# Calculadoras Financeiras

Site de calculadoras financeiras gratuitas, feito em HTML + CSS + JavaScript puro (ES Modules), sem framework e sem build step.

## Rodando localmente

Módulos ES não funcionam abrindo o `index.html` direto (`file://`) — é preciso um servidor local.

**Não usar `python -m http.server` direto nesta máquina**: em algumas instalações Windows ele serve `.js` como `text/plain` (mapeamento vem do registro do Windows), o que quebra `<script type="module">` silenciosamente. Use o script `serve.py` na raiz do `sites-apps`, que corrige isso:

```bash
python ../serve.py . 8000
```

Depois acesse `http://localhost:8000`.

## Estrutura

```
calculadoras-financeiras/
├── index.html          → hub listando as calculadoras
├── juros-compostos.html → calculadora de juros compostos com aportes mensais
├── sobre.html
├── privacidade.html
├── css/style.css
├── js/
│   ├── calculos.js     → lógica pura de cálculo (sem DOM)
│   ├── formatador.js   → formatação de moeda/percentual/período
│   ├── dom.js           → leitura de inputs e escrita de resultados no DOM
│   └── main.js          → liga os event listeners da página
└── assets/
```

## Adicionando uma nova calculadora

1. Criar o `.html` novo seguindo o padrão de `juros-compostos.html` (mesmo header/footer, ad-slots).
2. Adicionar a(s) função(ões) de cálculo em `js/calculos.js` (funções puras, testáveis).
3. Reaproveitar `formatador.js` e `dom.js` sempre que possível.
4. Criar um `js/main-<nome>.js` próprio se a página tiver formulário/DOM diferente do de juros compostos.
5. Adicionar o card da nova calculadora em `index.html`.

## Anúncios

Os blocos com classe `.ad-slot` são espaços reservados para anúncios (AdSense/Ezoic) — ainda vazios de propósito. Não inserir scripts de anúncio até o site ter conteúdo suficiente e estar aprovado.

## Deploy

Cloudflare Pages (Workers & Pages → Create → Pages → Connect to Git). Sem build command, sem output directory especial — arquivos estáticos servidos direto.
