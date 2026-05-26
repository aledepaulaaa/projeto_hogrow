---
description: Testes | TDD
---

REGRAS:

1. Após toda implementação e ajuste no código, realizar testes tanto no frontend quanto no backend.

2. Para o frontend, rodar testes como "npx tsc --noEmit"
3. No backend, rodar "npm run start:dev" e "npm test" e testes de verificação de erro em componentes e tipos. Após identificar, corrigi-los
4. Criar testes de integração, unitários e rodar eles em todas as features da aplicação. Caso já existe o ambiente de testes configurado, realizar o teste.
5. Usar testes E2E no Frontend usando playwright para detecção de erros
6. Criar as etapas de testes (RED, GREEN E REFACTOR) e implementa-las seguindo os principios do TDD.