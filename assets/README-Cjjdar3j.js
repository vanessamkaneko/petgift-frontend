const e=`# PetGift 🐾

Uma plataforma de adoção de pets desenvolvida com NestJS que conecta protetores de animais e potenciais adotantes.

## Visão Geral

PetGift é uma aplicação web que facilita a adoção de pets permitindo:

- Protetores registrarem e gerenciarem seus pets para adoção
- Potenciais adotantes navegarem e filtrarem pets disponíveis
- Autenticação e autorização segura de usuários
- Gerenciamento de pets (criar, atualizar, deletar, adotar)

## Tecnologias

- **Backend**: NestJS
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT & Autenticação baseada em sessão
- **Segurança**: Helmet para cabeçalhos HTTP
- **Validação**: Class-validator
- **Criptografia de Senha**: Bcrypt

## Funcionalidades Principais

### Usuários
- Registro de usuário (Adotantes e Protetores)
- Autenticação e autorização
- Gerenciamento de perfil

### Pets
- Registro de pets por protetores
- Listagem e filtragem de pets
- Processo de adoção
- Acompanhamento do status do pet (Disponível/Adotado)

### Endpoints da API

\`\`\`
Autenticação
- POST /auth/login - Autenticação de usuário

Adotantes
- POST /adopter - Criar adotante
- GET /adopter/:id - Obter perfil do adotante
- PUT /adopter/update/:id - Atualizar adotante
- DELETE /adopter/delete/:id - Deletar adotante

Protetores
- POST /protector - Criar protetor
- GET /protector/:id - Obter perfil do protetor
- PUT /protector/update/:id - Atualizar protetor 
- DELETE /protector/delete/:id - Deletar protetor

Pets
- POST /pet - Registrar novo pet
- GET /pets - Listar todos os pets
- GET /pet/:id - Obter detalhes do pet
- GET /pets/filter - Filtrar pets
- PUT /pet/update/:id - Atualizar pet
- DELETE /pet/delete/:id - Deletar pet
- POST /pet/adopt/:id - Adotar pet
\`\`\`

## Como Começar

1. Clone o repositório
2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Crie um arquivo [\`.env.development\`](.env.development) com:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/petgift
JWT_SECRET=seu_jwt_secret
\`\`\`

4. Execute a aplicação:
\`\`\`bash
npm run start:dev
\`\`\`

A API estará disponível em \`http://localhost:3333\`

## Arquitetura

O projeto segue os princípios da Clean Architecture com:

- **Camada de Aplicação**: Controllers e módulos DI
- **Camada Core**: Regras de negócio, entidades e casos de uso
- **Camada de Infraestrutura**: Banco de dados, repositórios e serviços externos

## Contribuindo

Sinta-se à vontade para enviar issues e pull requests.

## Licença

Este projeto está licenciado sob a licença UNLICENSED.`;export{e as default};
