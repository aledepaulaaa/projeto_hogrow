# Historico do Projeto HoGrow

## Contexto
O webapp HoGrow tem como objetivo apoiar a campanha "Copa do Mundo", onde clientes ganham "giros de roleta" em suas compras acima de um determinado valor. Este app digitaliza a roleta, engajando os clientes atraves de uma interface gamificada e premium.

## Fluxo de Desenvolvimento
1. **Fase 1: Scaffolding e UI Foundation**
   - Inicializacao do monorepo e frontend (Vite, React, TypeScript).
   - Configuracao de roteamento, Material-UI, temas, Intlayer (i18n).
   - Criacao de componentes basicos (Layout, Sidebar, Header, Auth).

2. **Fase 2: Views e Gamificacao**
   - Criacao da Dashboard gamificada.
   - Implementacao do componente `RouletteWheel` com SVG e animacoes (Framer Motion).
   - Hook customizado `useRoulette` para gerenciar logica, giros e premiacoes aleatorias baseadas nas "fatias" da roleta.

3. **Fase 3: Backend e API**
   - Inicializacao do NestJS com Prisma ORM e PostgreSQL.
   - Criacao dos modulos de Autenticacao (JWT) e Usuarios.
   - Integracao com Docker (docker-compose para Postgres).

4. **Fase 4: DevOps e Containerizacao**
   - Dockerfile de producao para frontend (Nginx) e backend (Node).
   - Nginx configurado para servir SPA e proxy reverso para API `/api/`.
   - `docker-compose.yml` finalizado para rodar o ambiente com frontend, backend e DB.

## Proximos Passos (Continuacao por outros Agentes/Devs)
- **Painel Administrativo:** Criar CRUD no backend para genrenciar premios e probabilidades.
- **Relatorios:** View no frontend para adminstradores visualizarem distribuicao de premios.
- **Auditoria de Giros:** Associar cada giro a uma nota fiscal / compra especifica para prevencao de fraudes.

## Regras de Projeto
- **Zero Emojis:** Nao devem ser inseridos emojis no layout nem na documentacao em partes visiveis ao usuario final.
- **Componentizacao:** Usar `GlassCard` e `AnimatedPage` para consistencia.
- **Internacionalizacao:** Todo texto novo deve passar pelo `Intlayer` usando `*.content.ts`.
- **Rotas:** SPA baseada no Client Side Rendering sem prefixos de URL para locale.
