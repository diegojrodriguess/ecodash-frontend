
# 🌱 Ecodash Frontend

Interface web do Ecodash, uma plataforma para gerenciamento de projetos ambientais e seus respectivos pesquisadores.

Este projeto foi desenvolvido com [Next.js](https://nextjs.org/), React e Leaflet para visualização geográfica dos projetos.

---

## ✅ Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [React Leaflet](https://react-leaflet.js.org/) (visualização de mapas)
- [React Select](https://react-select.com/home) (autocomplete)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

---

## ⚙️ Requisitos

- Node.js (v18+)
- NPM

> ⚠️ **Atenção:** é necessário que o [servidor backend](https://github.com/diegojrodriguess/ecodash-backend) esteja rodando **antes** de iniciar o frontend, pois a aplicação consome a API do Ecodash para exibir e gerenciar os dados.

As instruções para rodar o backend estão disponíveis no [README do repositório oficial](https://github.com/diegojrodriguess/ecodash-backend).

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/ecodash-frontend.git
cd ecodash-frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse a aplicação em:

```
http://localhost:3001
```

---

## 🧭 Funcionalidades

- Listagem de pesquisadores e projetos
- Criação, edição e remoção de registros
- Visualização dos projetos no mapa (GeoJSON)
- Preenchimento automatizado com **autocomplete** na escolha de pesquisadores
- Usabilidade aprimorada no formulário de projetos com **marcação geográfica no mapa**

---

## 🔍 Estrutura de Pastas

```bash
src/
  app/
    researchers/       # Listagem e edição de pesquisadores
    projects/          # Listagem, mapa e edição de projetos
    page.tsx           # Tela inicial (navegação)
  styles/              # Estilos globais e componentes
```

---


## 🧭 Navegação Inicial

Ao iniciar o frontend, você encontrará dois botões principais:

- **Projetos**
- **Pesquisadores**

Eles redirecionam para suas respectivas telas de listagem, onde é possível editar, excluir e visualizar os dados.

---

## 📌 Observações

- A comunicação com a API se dá via `fetch` para `http://localhost:3000`, portanto certifique-se de que o backend esteja rodando localmente nesta porta.

