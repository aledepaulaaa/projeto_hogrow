# Mapa da Arquitetura do Frontend HoGrow

Este documento lista a infraestrutura e a localizacao dos arquivos-chave do frontend Vite+React do webapp HoGrow.

## Estrutura do Frontend

```text
e:/projeto_hogrow/frontend/
├── public/                         # Assets estaticos (logos SVG, parceiros, mascote)
├── src/
│   ├── components/                 # Componentes reusaveis da UI
│   │   ├── AnimatedPage.tsx        # Wrapper de transicao de pagina (Framer Motion)
│   │   ├── GlassCard.tsx           # Card com efeito glassmorphism (3 variantes)
│   │   ├── Logo.tsx                # Logo responsiva (dark/light mode)
│   │   ├── LocaleSwitcher.tsx      # Alternador de idioma (PT/EN)
│   │   └── SplashScreen.tsx        # [V3] Tela de abertura animada (Canarinho, logo e confetes)
│   ├── context/                    # React Contexts
│   │   └── AuthContext.tsx         # Estado global de autenticacao (login, register, logout)
│   ├── hooks/                      # Custom Hooks
│   │   ├── useAuth.ts              # Hook de consumo do AuthContext
│   │   ├── useRoulette.ts          # Logica de giro, premiacoes e animacao
│   │   └── useThemeMode.ts         # Alternancia dark/light mode
│   ├── router/                     # Roteamento SPA
│   │   ├── AppRouter.tsx           # Definicao de rotas protegidas (Portfolio, Copa, Roleta, Chat, Resultados, Perfil)
│   │   └── ProtectedRoute.tsx      # Guard de autenticacao
│   ├── services/                   # Camada de comunicacao com API
│   │   ├── api.ts                  # Instancia Axios com interceptors
│   │   └── auth.service.ts         # Endpoints de autenticacao
│   ├── theme/                      # Design System MUI
│   │   └── theme.ts                # Paleta (#1D2C5C, #FFAA01, #EFEFEF), tipografia, glassmorphism
│   ├── types/                      # Interfaces e Types TypeScript
│   │   └── auth.types.ts           # LoginCredentials, RegisterCredentials (V3: empresaName), UserProfile (V3: empresaId/Name)
│   ├── utils/                      # Utilitarios
│   │   ├── apiErrors.content.ts    # Dicionario Intlayer de erros da API
│   │   └── handleApiError.ts       # Funcao global de tratamento de erros HTTP
│   ├── views/                      # Paginas da Aplicacao
│   │   ├── auth/                   # Login, Register (TextField livre de Empresa), ForgotPassword, ResetPassword
│   │   ├── layouts/                # MainLayout, Header, Sidebar (V3: Removido Dashboard, Portfolio como primeiro item)
│   │   ├── profile/                # ProfileView
│   │   ├── roulette/               # RouletteView (V3: Balão de Giros), RouletteWheel (V3: Contorno de alta legibilidade, Responsivo e Multiline), RouletteResult
│   │   ├── portfolio/              # PortfolioView (V3: Mapa Oficial SVG, Regionalidade, Grid de Parceiros)
│   │   │   ├── logos.ts            # Catalogo das 33 marcas parceiras categorizadas por região/estado
│   │   │   └── hotelData.ts        # Mapeamento do Brasil com estados e suas respectivas regiões (Norte, Sul, etc.)
│   │   ├── world-cup/              # WorldCupView, ReservationForm (Integrado ao catálogo de logos.ts)
│   │   └── results/                # ResultsView (V3: Cards Dinâmicos de Estatísticas e Leaderboard compacto)
│   └── App.tsx                     # Montagem global com Providers e SplashScreen integrado
├── intlayer.config.ts              # Configuracao i18n (pt/en, no-prefix, static import)
├── nginx.conf                      # Proxy Reverso para producao
└── Dockerfile                      # Build SPA servido via Nginx
```

## Bibliotecas Principais

- `react-intlayer`: i18n dinamico pt-BR/en (declaracoes via `*.content.ts`).
- `@mui/material` & `@mui/icons-material`: Design System e iconografia.
- `framer-motion`: Animacoes fluidas e micro-interacoes.
- `axios`: Comunicacao com a API Backend (interceptors no AuthService).
- `react-router-dom` v6: Roteamento SPA (`no-prefix` layout).
- `react-confetti`: [V2] Animacao de confetes nas cores da bandeira.

## Paleta de Cores

| Cor      | Hex       | Uso                              |
|----------|-----------|----------------------------------|
| Branco   | `#EFEFEF` | Fundo light mode                 |
| Azul     | `#1D2C5C` | Fundo dark mode, textos          |
| Amarelo  | `#FFAA01` | Botoes, destaques, secondary     |
| Verde    | `#009C3B` | [V2] Copa - confetes, destaques  |
| Azul Copa| `#002776` | [V2] Copa - confetes, destaques  |

## Como Rodar

1. **Desenvolvimento Local:**
   - `cd frontend && npm run dev`
   - Vite rodando na porta 5173

2. **Producao (Docker):**
   - `docker-compose up --build -d` na raiz do projeto
   - Frontend servido via Nginx na porta 80
