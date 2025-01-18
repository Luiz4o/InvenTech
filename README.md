# InvenTech - React Frontend

Este é o frontend de uma aplicação de gerenciamento de produtos e estoque, feita em **React** com **TypeScript**. Ele interage com uma API backend para realizar ações como login, registro de usuários, CRUD de produtos e gerenciamento de estoque.

A aplicação usa **Axios** para fazer requisições à API e **JWT (JSON Web Token)** para autenticação de usuários. O token JWT é armazenado no `localStorage` para garantir que o usuário esteja autenticado ao acessar funcionalidades protegidas, como a aba de estoque.

## Funcionalidades

### 1. **Login e Registro de Usuários**
- O usuário pode se registrar criando um novo perfil.
- O login é feito com o envio do email e senha, e o servidor responde com um **JWT** que é armazenado no `localStorage`.
- O JWT é utilizado para autenticar o usuário em requisições subsequentes.

### 2. **Gerenciamento de Produtos**
- **Registrar Produto**: O usuário pode cadastrar um novo produto e sua quantidade em estoque.
- **Editar Produto**: O usuário pode editar informações de um produto existente.
- **Atualizar Estoque**: A quantidade de produtos no estoque pode ser atualizada.
- **Ver Estoque**: O usuário pode visualizar todos os produtos no estoque, incluindo seus atributos e quantidades.

### 3. **Autenticação e Proteção de Rotas**
- O JWT é armazenado no `localStorage` após o login, garantindo que o usuário possa acessar funcionalidades protegidas, como o estoque e operações de CRUD.

---

## Tecnologias Utilizadas

- **React** com **TypeScript**
- **Axios** para realizar requisições HTTP
- **React Router** para navegação entre páginas
- **JWT (JSON Web Token)** para autenticação de usuários
- **localStorage** para armazenar o token JWT
