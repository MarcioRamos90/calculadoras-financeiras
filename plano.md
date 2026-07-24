# Plano: Site de Calculadoras Financeiras (Criação → Deploy → Monetização)

## Fase 1 — Planejamento e escopo

**O que construir primeiro (MVP)**
- 1 calculadora principal: juros compostos com aportes mensais (a de maior volume/menor concorrência que você validar no Keyword Planner)
- 3-5 variações da mesma calculadora em páginas separadas (ex: com inflação, diária, CDB, comparador simples vs composto) — cada variação = uma página própria, otimizada para uma keyword de cauda longa diferente
- Página inicial simples listando todas as calculadoras
- Página "Sobre" e "Política de Privacidade" (obrigatórias para aprovação no AdSense)

**Por que múltiplas páginas em vez de uma calculadora só**
Cada página captura tráfego de uma busca diferente. Uma calculadora genérica compete com sites grandes; 5 páginas de nicho competem individualmente por termos mais fáceis.

---

## Fase 2 — Stack técnico

Para esse tipo de ferramenta, não precisa de backend nem banco de dados — tudo roda no navegador (client-side). Sem estado complexo, sem roteamento sofisticado — HTML/CSS/JS puro resolve isso com SEO idêntico ao de qualquer framework, sem build step, sem dependência quebrando com o tempo, e com deploy mais simples.

**Recomendação (conforme decisão global do repositório)**
- **HTML + CSS + JavaScript puro**, sem framework (React/Next descartados deliberadamente)
- JavaScript moderno com **ES Modules nativos** (`<script type="module">`), separando lógica em arquivos com `import`/`export` — nada de variável global solta
- Um `css/style.css` compartilhado entre as páginas
- Lógica de cálculo isolada em `js/calculos.js` (funções puras, sem tocar o DOM — fáceis de testar)
- Sem framework, sem Node, sem build — sobe direto pra hospedagem estática
- Para testar localmente: `python -m http.server` (módulos ES não funcionam via `file://`, exigem servidor local)

**Estrutura de pastas** (padrão definido no CONTEXTO-GLOBAL)
```
calculadoras-financeiras/
├── index.html                    → hub listando as calculadoras
├── juros-compostos.html          → calculadora principal
├── juros-compostos-aportes.html
├── juros-compostos-inflacao.html
├── sobre.html
├── privacidade.html
├── css/
│   └── style.css
├── js/
│   ├── calculos.js               → lógica pura, sem tocar DOM (fácil de testar)
│   ├── formatador.js             → formatação (moeda, %, datas)
│   ├── dom.js                    → leitura de inputs / escrita de resultados
│   └── main.js                   → importa módulos, liga event listeners
├── assets/
├── .gitignore
└── README.md
```

---

## Fase 3 — Construção

1. Implementar a lógica de cálculo em `js/calculos.js` como funções puras (fórmula de juros compostos é simples, não precisa de biblioteca)
2. Criar formulário de input (valor inicial, taxa, tempo, aporte mensal); leitura/escrita no DOM isolada em `js/dom.js`
3. Mostrar resultado com gráfico simples de evolução (biblioteca gratuita: Chart.js — carregada via CDN, sem build)
4. Cada página deve ter: título único, meta description única, H1 com a palavra-chave alvo, texto explicativo abaixo da calculadora (200-400 palavras) explicando o conceito — isso ajuda SEO e dá espaço editorial pro Google confiar no conteúdo
5. Deixar espaços reservados (divs vazias) onde os anúncios vão entrar depois — não adicionar o código de ads ainda nessa fase

---

## Fase 4 — Deploy

**Hospedagem gratuita recomendada: Cloudflare Pages**

Escolhida no lugar de Vercel por dois motivos concretos pro seu caso: (1) o plano gratuito da Vercel restringe uso comercial nos termos de serviço, e um site com anúncio conta como comercial; (2) você pretende subir vários sites com o tempo, e o plano gratuito da Cloudflare Pages permite sites ilimitados com banda ilimitada — sem risco de travar no meio do mês (como acontece no plano gratuito da Netlify ao estourar o limite de créditos).

**Passo a passo**
1. Subir o código para um repositório no GitHub (um repositório por site/domínio — não por ferramenta individual)
2. Criar conta gratuita na Cloudflare (dashboard.cloudflare.com)
3. No painel, ir em **Workers & Pages → Create → Pages → Connect to Git**, selecionar o repositório
4. Como é HTML/CSS/JS puro, não precisa configurar comando de build nem diretório de output especial — a Cloudflare detecta e serve os arquivos estáticos direto
5. Testar no domínio temporário gratuito (ex: `seuprojeto.pages.dev`)
6. Comprar um domínio próprio (Registro.br para `.com.br`, ~R$40/ano fixo com WHOIS privado incluso; ou Cloudflare Registrar para `.com`). Sempre checar o preço de **renovação** antes de fechar — evitar registradoras com "primeiro ano barato, renovação cara"
7. Ir em **Custom domains** dentro do projeto na Cloudflare Pages e adicionar o domínio — se o domínio já estiver com DNS gerenciado pela própria Cloudflare (recomendado), a configuração é automática; se estiver em outro registrador, basta apontar um registro CNAME conforme a própria Cloudflare indica
8. Repetir esse mesmo fluxo pra cada novo site — cada um vira um projeto separado dentro da mesma conta Cloudflare, sem custo adicional

**Custo dessa fase**: só o domínio de cada site (~R$40-60/ano cada). Hospedagem e deploy ficam gratuitos, mesmo somando vários sites na mesma conta.

---

## Fase 5 — SEO básico (antes de pensar em ads)

Sem tráfego, não tem anúncio que pague nada — essa fase importa mais que a de monetização.

1. **Google Search Console**: cadastrar o site, enviar sitemap. Como é HTML estático, o `sitemap.xml` é escrito/mantido à mão (arquivo simples na raiz) — sem plugin de build
2. **Google Analytics**: instalar para acompanhar visitas (gratuito)
3. Cada página precisa responder bem à intenção de busca: quem busca "calculadora juros compostos com aportes mensais" quer ver o campo de aporte mensal já visível, não escondido atrás de configuração
4. Tempo de carregamento rápido — HTML/CSS/JS puro servido pela CDN da Cloudflare já é naturalmente rápido (sem JS de framework para baixar)
5. Ter pelo menos 15-20 páginas de conteúdo indexável e o site no ar por alguns meses antes de aplicar pro AdSense

---

## Fase 6 — Monetização: como funciona na prática

### Opção A — Google AdSense (mais comum para começar)

**Como se cadastrar**
1. Ter o site com conteúdo original, política de privacidade, termos de uso, e pelo menos alguns meses de existência
2. Criar conta em adsense.google.com e submeter o site para revisão
3. Aprovação pode levar de alguns dias a algumas semanas

**Como a integração técnica funciona**
1. O Google te dá um trecho de código JavaScript (tag `<script>`) para colar no `<head>` de todas as páginas
2. Depois, você cria "blocos de anúncio" (ad units) no painel do AdSense — cada bloco gera um `<ins>` + script específico
3. Você cola esses blocos nos espaços reservados que deixou na Fase 3 (ex: acima da calculadora, entre a calculadora e o texto explicativo, no rodapé)
4. Em Next.js, isso normalmente vai dentro de um componente `<AdUnit>` reutilizável que injeta o script via `useEffect`

**Como você recebe**
- Pagamento por CPM (a cada mil impressões de anúncio visualizadas), não mais por clique isolado
- Pagamento mensal, via transferência bancária, quando atingir o mínimo (geralmente $100 USD equivalente)
- É necessário preencher informações fiscais (CPF, dados bancários) dentro do próprio painel do AdSense

### Opção B — Ezoic (bom para tráfego menor, aceita desde o início)

- Não exige volume mínimo de tráfego para começar (diferente do Mediavine)
- Funciona parecido: você instala um script (ou usa o "Ezoic Integration" via Cloudflare, que é ainda mais simples), e a plataforma testa automaticamente posições de anúncio por IA para maximizar receita
- RPM geralmente mais alto que AdSense puro

### Opção C — Mediavine (só depois de crescer)

- Exige ~50 mil sessões/mês
- Melhor pagamento entre as três, mas só vale a pena aplicar depois que o site já tiver tração

**Recomendação de ordem**: começar com AdSense (mais fácil de entrar), migrar para Ezoic quando tiver tráfego relevante, e mirar Mediavine como meta de longo prazo.

---

## Fase 7 — Cronograma sugerido

| Semana | Atividade |
|---|---|
| 1 | Validar palavras-chave no Keyword Planner, escolher as 5 primeiras calculadoras |
| 2-3 | Construir o site (calculadoras + textos + design básico) |
| 3 | Deploy na Cloudflare Pages, comprar domínio, configurar DNS |
| 4 | Configurar Search Console e Analytics, enviar sitemap |
| 4-16 | Produzir mais páginas/calculadoras de nicho, aguardar indexação e tráfego orgânico crescer |
| ~mês 3-4 | Aplicar para o Google AdSense |
| Conforme tráfego cresce | Avaliar migração para Ezoic |

---

## Observações importantes

- Isso não é "renda passiva" na fase inicial — o trabalho pesado é SEO e conteúdo, não código
- Ferramentas de cálculo simples (juros compostos) são fáceis de clonar — o diferencial real vem de: mais variações de nicho, melhor UX, e conteúdo explicativo que ajuda a ranquear
- Evite terceirizar conteúdo só com IA sem revisão — o Google penaliza isso na aprovação do AdSense e no ranqueamento