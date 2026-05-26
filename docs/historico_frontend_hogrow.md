# Historico do Frontend HoGrow

## Contexto
O frontend Vite+React do webapp HoGrow fornece a interface gamificada da campanha Copa do Mundo, com roleta interativa, sistema de pontuacao e portfolio de hoteis.

## Fluxo de Desenvolvimento

### v1.0 - Fase 1: Scaffolding e UI Foundation (21/05/2026)
- Inicializacao do monorepo frontend (Vite, React, TypeScript).
- Configuracao de roteamento (react-router-dom v6), Material-UI, temas, Intlayer (i18n).
- Criacao de componentes basicos: Layout (MainLayout, Header, Sidebar), Auth (Login, Register).
- Design System: Glassmorphism, paleta (#1D2C5C, #FFAA01, #EFEFEF), tipografia Inter/Aleo.
- Componentes reusaveis: GlassCard, AnimatedPage, Logo, LocaleSwitcher.

### v1.1 - Fase 2: Views e Gamificacao (21/05/2026)
- Criacao da Dashboard gamificada com cards de Total de Giros e Premios.
- Implementacao do componente `RouletteWheel` com SVG e animacoes (Framer Motion).
- Hook customizado `useRoulette` para gerenciar logica, giros e premiacoes.
- Componente `RouletteResult` com modal de resultado e celebracao.

### v1.2 - Fase 3: Autenticacao e Erros (21/05/2026)
- Contexto de autenticacao global (AuthContext) com login/register/logout.
- Guardas de rota (ProtectedRoute) com verificacao JWT.
- Tratamento global de erros HTTP (handleApiError) com traducoes pt-BR/en.
- Botoes de visualizar senha (eye on/off) em Login e Register.
- Paginas ForgotPassword e ResetPassword.
- Internacionalizacao completa via Intlayer com dicionarios *.content.ts.

### v2.0 - Fase 4: Campanha Copa do Mundo (22/05/2026)
- Atualizacao do cadastro com campos Telefone (+55) e Agencia (dropdown).
- Saudacao inteligente no Header (genero por heuristica do primeiro nome).
- Menu lateral reorganizado com novos itens: Portfolio, Campanha, Chat, Resultados, Regulamento.
- Portfolio HoGrow: Mapa SVG interativo do Brasil com hoteis por estado.
- Campanha Copa do Mundo: Roleta tematica + formulario de reservas + confetes.
- Ranking por agencia em Resultados.
- Personalizacao visual com cores da Copa (verde, amarelo, azul).

### v3.0 - Fase 5: Refatoração de Empresas & Melhorias de Fidelidade (25/05/2026 - ATUAL)
- Refatoração completa da relação Agência para Empresa (permitindo digitação livre no cadastro).
- Reconfiguração de rotas e sidebar: Remoção total do Dashboard, tornando a visualização de Portfólio a tela inicial principal.
- Integração de cards de estatísticas (giros e prêmios) no topo da tela de Resultados Gerais e Pessoais.
- Adoção do SVG oficial `brazil.svg` de alta fidelidade para o mapa do Brasil com calibração precisa de labels, contorno para legibilidade extrema e legenda explicativa.
- Configuração das 14 opções reais de brindes e pontos na roleta, com quebra de linhas automática via `<tspan>` e redimensionamento 100% responsivo para mobile (290px a 440px).
- Criação do componente SplashScreen com exibição sequencial animada (Canarinho Pistola e Logo HoGrow) sob uma chuva densa e contínua de confetes tricolores de 5 segundos.
- Exibição real em Grid das logomarcas dos hotéis parceiros na aba correspondente do Portfólio, com efeitos flutuantes e borda de marca tricolor.

## Regras do Projeto
- **Componentizacao:** Maximo 200 linhas por componente (regra /clean-code).
- **Zero Emojis:** Nenhum emoji na interface.
- **Internacionalizacao:** Todo texto via Intlayer usando `*.content.ts`.
- **Mobile First:** Responsividade minima 320px (iPhone SE).
- **Glassmorphism:** Uso consistente de GlassCard e AnimatedPage.
