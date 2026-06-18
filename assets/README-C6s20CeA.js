const e=`# PetGift 🐾

Uma plataforma de adoção de pets desenvolvida com NestJS que conecta protetores de animais e potenciais adotantes.

## Visão Geral

PetGift é uma aplicação web que facilita a adoção de pets permitindo:

- Protetores registrarem e gerenciarem seus pets para adoção
- Potenciais adotantes navegarem e filtrarem pets disponíveis
- Autenticação e autorização segura de usuários
- Gerenciamento de pets (criar, atualizar, deletar, adotar)

## Tecnologias

- **Backend**: NestJS (Node.js)
- **Banco de Dados**: MongoDB com Mongoose (ODM)
- **Autenticação**: JWT & Autenticação baseada em sessão
- **Segurança**: Helmet para cabeçalhos HTTP
- **Validação**: Class-validator e Class-transformer
- **Criptografia de Senha**: Bcrypt

## Funcionalidades Principais

### Usuários
- Registro de usuário (Adotantes e Protetores)
- Autenticação e autorização
- Gerenciamento de perfil e upload de foto

### Pets
- Registro de pets por protetores
- Listagem e filtragem de pets
- Upload de foto do pet
- Processo de adoção
- Acompanhamento do status do pet (Disponível/Adotado)

## Endpoints da API

Toda chamada à API no backend deve ser feita sob o prefixo \`/api\` (ex: \`http://localhost:3333/api\`):

### Gerais / Health Check
- GET /api - Verifica se o backend está online

### Autenticação
- POST /api/auth/login - Autenticação de usuário (Login)

### Adotantes
- POST /api/adopter - Criar adotante
- GET /api/adopter/:id - Obter perfil do adotante
- PUT /api/adopter/update/:id - Atualizar adotante
- DELETE /api/adopter/delete/:id - Deletar adotante
- POST /api/adopter/:id/photo - Upload de foto de perfil do adotante

### Protetores
- POST /api/protector - Criar protetor
- GET /api/protector/:id - Obter perfil do protetor
- PUT /api/protector/update/:id - Atualizar protetor 
- DELETE /api/protector/delete/:id - Deletar protetor
- POST /api/protector/:id/photo - Upload de foto de perfil do protetor

### Pets
- POST /api/pet - Registrar novo pet (Restrito a Protetores)
- GET /api/pets - Listar todos os pets cadastrados
- GET /api/pet/:id - Obter detalhes de um pet específico
- GET /api/pets/filter - Filtrar pets cadastrados por critérios
- PUT /api/pet/update/:id - Atualizar informações do pet
- DELETE /api/pet/delete/:id - Deletar pet do sistema
- POST /api/pet/:id/photo - Upload de foto do pet
- POST /api/pet/adopt/:id - Adotar pet (Restrito a Adotantes)
- GET /api/pet/my-adoptions - Listar pets adotados pelo adotante autenticado (Restrito a Adotantes)
- GET /api/pet/my-registrations - Listar pets cadastrados pelo protetor autenticado (Restrito a Protetores)

## Como Começar

1. Clone o repositório
2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Crie um arquivo \`.env.development\` com:
\`\`\`env
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

Sinta-se à vontade para enviar issues e para abrir pull requests.

## Licença

Este projeto está licenciado sob a licença UNLICENSED.`;export{e as default};
