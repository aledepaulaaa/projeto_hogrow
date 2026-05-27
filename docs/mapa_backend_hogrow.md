# Mapa da Arquitetura do Backend HoGrow

Este documento lista a infraestrutura e a localizacao dos arquivos-chave do backend NestJS do webapp HoGrow, auxiliando na navegacao e manutenabilidade.

## Estrutura do Backend

```text
e:/projeto_hogrow/backend/
├── prisma/
│   ├── schema.prisma          # Definicao das entidades do banco (User, Empresa, Reservation, SpinHistory, ChatMessage)
│   └── migrations/            # Migracoes do Prisma
├── src/
│   ├── auth/                  # Modulo de Autenticacao
│   │   ├── auth.module.ts     # Registra JWT, Passport, ClientsModule (RabbitMQ)
│   │   ├── auth.controller.ts # Endpoints: login, register, forgot-password, reset-password
│   │   ├── auth.service.ts    # Logica de negocio: hash bcrypt, emissao JWT, reset de senha
│   │   ├── dto/               # DTOs de validacao (RegisterDto, LoginDto)
│   │   └── strategies/        # JWT Strategy para Passport
│   ├── users/                 # Modulo de Gestao de Usuarios
│   │   ├── users.module.ts
│   │   ├── users.controller.ts # Endpoints: /me (GET/PATCH para perfil), /company-ranking, /reservations
│   │   ├── users.service.ts   # Camada de negocio (findByEmail, update, getCompanyRanking)
│   │   ├── users.repository.ts # Camada de acesso ao banco (Prisma queries, queries analíticas de classificação)
│   │   └── dto/               # DTOs de usuario
│   ├── mail/                  # Modulo de E-mail (Microservice RabbitMQ)
│   │   ├── mail.module.ts
│   │   ├── mail.controller.ts # Consumer: @EventPattern('send_reset_email')
│   │   └── mail.service.ts    # Nodemailer + template HTML com branding HoGrow
│   ├── prisma/                # Provider global do Prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts  # Instancia do PrismaClient
│   ├── common/                # Utilitarios globais
│   │   └── filters/           # GlobalExceptionFilter (tratamento HTTP 400/401/403/404/500)
│   ├── app.module.ts          # Modulo raiz (imports: Config, Prisma, Auth, Users, Mail)
│   └── main.ts                # Entry point (Swagger, CORS, ValidationPipe, RabbitMQ microservice)
├── public/                    # Assets estaticos (logo.png para e-mails)
├── Dockerfile                 # Build multi-stage Node Alpine
└── .env                       # Variaveis de ambiente (PORT, JWT_SECRET, DATABASE_URL, RABBITMQ_URL, MAIL_*)
```

## Bibliotecas Principais

- `@nestjs/core` & `@nestjs/common`: Framework MVC e Injecao de Dependencias.
- `@prisma/client` & `prisma`: ORM para PostgreSQL (Prisma 7 com adapter-pg).
- `@nestjs/jwt` & `passport-jwt`: Autenticacao JWT (validade 7d).
- `@nestjs/swagger`: Documentacao auto-gerada de endpoints.
- `@nestjs/microservices` & `amqplib`: Integracao RabbitMQ para microservicos.
- `nodemailer`: Envio de e-mails (Mailtrap em dev).
- `bcrypt`: Hash seguro de senhas.
- `class-validator` & `class-transformer`: Validacao de DTOs.

## Como Rodar

1. **Desenvolvimento Local:**
   - `cd backend && npm run start:dev`
   - API rodando na porta 3535
   - Swagger: `http://localhost:3535/api-docs`

2. **Producao (Docker):**
   - `docker-compose up --build -d` na raiz do projeto
