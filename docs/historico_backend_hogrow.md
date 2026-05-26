# Historico do Backend HoGrow

## Contexto
O backend NestJS do webapp HoGrow fornece a API REST para autenticacao, gestao de usuarios e microservicos de e-mail.

## Fluxo de Desenvolvimento

### v1.0 - Fase 1: Scaffolding (21/05/2026)
- Inicializacao do NestJS com Prisma ORM e PostgreSQL.
- Criacao dos modulos de Autenticacao (JWT) e Usuarios.
- Integracao com Docker (docker-compose para Postgres).
- Criacao do schema Prisma com model User basico.

### v1.1 - Fase 2: Tratamento de Erros Global (21/05/2026)
- Implementacao do `GlobalExceptionFilter` para tratamento HTTP 400/401/403/404/500.
- Mensagens de erro em portugues com depuracao avancada.
- Interceptors globais registrados no `main.ts`.

### v1.2 - Fase 3: Microservico de E-mail (21/05/2026)
- Integracao RabbitMQ via `@nestjs/microservices`.
- Modulo `MailModule` com consumer `send_reset_email`.
- Template HTML de e-mail com branding HoGrow (logo, cores).
- Endpoints `forgot-password` e `reset-password` no AuthController.
- Campos `resetPasswordToken` e `resetPasswordExpires` no model User.

### v1.3 - Fase 4: DevOps (21/05/2026)
- Dockerfile multi-stage (Node Alpine).
- docker-compose.yml com PostgreSQL, RabbitMQ, backend e frontend.

### v1.4 - Fase 5: Refatoração Empresa (25/05/2026 - ATUAL)
- Renomeação de todas as entidades de Agency/agência para Empresa/empresa no Prisma e código NestJS.
- Inclusão do fluxo `find-or-create` automático de Empresas por nome de texto livre durante o registro do usuário.
- Atualização do seed script e DTOs para compatibilidade total.

## Regras do Projeto
- **SOLID:** Separacao rigorosa Service -> Repository -> PrismaService.
- **DTOs:** Validacao via `class-validator` em todo endpoint.
- **Seguranca:** Credenciais via variaveis de ambiente (`@nestjs/config`).
- **Zero Emojis:** Nenhum emoji no layout/documentacao visivel ao usuario.
