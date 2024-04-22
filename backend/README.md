# Tripleten web_project_around_express

![Node.js](https://cdn.dribbble.com/users/505482/screenshots/1776789/media/5d3094465ad0a2d20715818a7ef22404.gif)

## API com Node.js e Express.js

Este é um exemplo de uma API simples criada com Node.js e Express.js para fornecer dados para um frontend. A API possui rotas para manipular dados de usuários, cards e interações como curtidas.

Este projeto faz parte dos estudos do curso de Web Development oferecido pela Tripleten.

## Requisitos

Certifique-se de ter o Node.js instalado em seu sistema antes de executar este projeto.

## Instalação

1. Clone este repositório para o seu sistema local.
2. Navegue até o diretório do projeto no terminal.
3. Execute o seguinte comando para instalar as dependências:

```bash
npm install

## Uso
Para iniciar o servidor, execute o seguinte comando:
npm run dev
Isso iniciará o servidor na porta 3000 por padrão.

### Rotas

Usuários
GET /users: Retorna uma lista de todos os usuários.
GET /users/:userId: Retorna os detalhes de um usuário com o ID especificado.
PATCH /users/me: Atualiza o perfil do usuário.
PATCH /users/me/avatar: Atualiza o avatar do usuário.

Cards
GET /cards: Retorna uma lista de todos os cards.
POST /cards: Cria um novo card.
DELETE /cards/:cardId: Deleta um card com o ID especificado.
PUT /cards/:cardId/likes: Curte um card.
DELETE /cards/:cardId/likes: Descurte um card.
