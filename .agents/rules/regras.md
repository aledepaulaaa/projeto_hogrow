---
trigger: always_on
---

Contexto: a aplicação se trata de um webapp da empresa HoGrow. Seu objetivo é manter o padrão de desenvolvimento, seguindo as diretrizes de escalabilidade.

Relatórios: em "docs" existem documentos cruciais para contexto. Estes documentos devem ser atualizados tornando-os em "banco de dados" locais de informações da aplicação e documentação que explica o que cada coisa faz e como a aplicação se comporta. Sempre que coisas novas for implementada ou ajustada, usaremos o RAG (Retrieval Augmented Generation) é uma técnica utilizada para ampliar a capacidade de resposta de LLMs, combinando o conhecimento interno do modelo de linguagem com sistemas de recuperação de informações.

Regras:

1. Seguir os principios do SOLID, Clean Archteture, Design Patterns concisos.
2. Boas práticas de código limpo.
3. Testes automatizados (unitários, integração, e2e).
4. Maior quantidade de componentes, para ter códigos pequenos menores ao invés de aclopar muitas linhas de código o que dificulta a manutenção da aplicação.
5. Executar internamente a aplicação para testagem de fluxos antes de finalizar uma implementação evitando output sem consistência.