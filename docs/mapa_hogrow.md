# Mapa da Arquitetura do HoGrow

Este documento lista a infraestrutura e a localizacao dos arquivos-chave do webapp HoGrow, auxiliando na navegacao e manutenabilidade.

## Estrutura do Monorepo

```text
e:/projeto_hogrow/
├── backend/                  # API NestJS (Logica de negocio, Autenticacao)
│   ├── prisma/               # Schemas de Banco de Dados e Migracoes (Prisma 7)
│   ├── src/                  
│   │   ├── auth/             # Modulo JWT, Controllers de Login/Register
│   │   ├── users/            # Modulo de gestao de usuarios
│   │   ├── prisma/           # Provider global para o banco PostgreSQL
│   │   └── main.ts           # Entry point (Swagger, CORS, global pipes)
│   └── Dockerfile            # Imagem de producao Node.js + Prisma Migrate
│
├── frontend/                 # Aplicativo Vite React SPA
│   ├── public/               # Assets estaticos
│   ├── src/
│   │   ├── components/       # Componentes reusaveis da UI (GlassCard, AnimatedPage)
│   │   ├── context/          # React Contexts (AuthContext)
│   │   ├── hooks/            # Custom Hooks (useRoulette)
│   │   ├── router/           # React Router DOM v6, guardas de rota (ProtectedRoute)
│   │   ├── theme/            # Configuracoes MUI, mixins de glassmorphism
│   │   ├── types/            # Interfaces e types Typescript globais
│   │   ├── views/            # Paginas da Aplicacao (Dashboard, Roulette, Profile, Auth)
│   │   │   └── *.content.ts  # Dicionarios de traducao do Intlayer colocalizados
│   │   └── App.tsx           # Ponto de montagem global de Providers (MUI, Intlayer, Router)
│   ├── nginx.conf            # Proxy Reverso para producao
│   └── Dockerfile            # Build SPA servido via Nginx
│
├── docs/                     # Documentacao do projeto
└── docker-compose.yml        # Orquestracao de conteineres (postgres, backend, frontend)
```

## Bibliotecas Principais

- **Frontend:**
  - `react-intlayer`: Para i18n dinamico pt-BR / en (com declaracoes via `*.content.ts`).
  - `@mui/material`: Para UI Design System e iconografia (`@mui/icons-material`).
  - `framer-motion`: Animacoes fluidas e micro-interacoes (usado no Result modal e animacoes de pagina).
  - `axios`: Comunicacao com a API Backend (configurado via interceptors no AuthService).
  - `react-router-dom`: SPA routing (`no-prefix` layout).

- **Backend:**
  - `@nestjs/core`: Framework MVC de base e Injecao de Dependencias.
  - `@prisma/client` & `prisma`: ORM para PostgreSQL (com uso do `@prisma/adapter-pg` em config.ts no Prisma 7).
  - `@nestjs/jwt` & `passport`: Seguranca, hash bcrypt, emissao de JWTs com validade estendida (7d).
  - `@nestjs/swagger`: Documentacao de endpoints auto-gerada.

## Como Rodar o Projeto

1. **Desenvolvimento (Local)**
   - Backend: `cd backend` e `npm run start:dev` (A API vai rodar na porta 3000)
   - Frontend: `cd frontend` e `npm run dev` (O Vite vai rodar na porta 5173 e o intlayer estara ativo)

2. **Producao (Docker)**
   - No diretorio raiz `e:/projeto_hogrow/`, execute:
     `docker-compose up --build -d`
   - O Frontend estara em `localhost:80` com Nginx em modo SPA Proxy.
   - O DB PostgreSQL estara na porta `5432` da mesma rede interna.
