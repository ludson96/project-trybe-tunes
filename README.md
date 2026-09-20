# 🎧 TunesApp Pro

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-443e38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

Uma plataforma moderna de streaming e descoberta musical desenvolvida em **React 18** com **TypeScript** e **Tailwind CSS**. A aplicação consome a API oficial do **iTunes Search**, oferecendo busca em tempo real de discografias, reprodução contínua de áudio, sistema reativo de músicas favoritas e gerenciamento de perfil.

Projetada com arquitetura modular, tipagem estrita, gerenciamento de estado global descentralizado e suíte automatizada de testes unitários e de integração.

---

## ⚡ Principais Funcionalidades

- **Autenticação & Sessão:** Login intuitivo com validação reativa e persistência de perfil em store global.
- **Descoberta de Artistas & Álbuns:** Integração via **Axios** com a API do iTunes, tratando capas em alta resolução e paginação visual em grid responsivo.
- **Página do Álbum:** Visualização detalhada de faixas, ano de lançamento, contagem de músicas e metadados.
- **Player Contínuo Global:** Player fixo no rodapé alimentado por **Zustand**, permitindo que as prévias de áudio continuem tocando enquanto o usuário navega livremente pelas telas.
- **Sistema Reativo de Favoritos:** Adicione ou remova músicas aos favoritos com feedback visual instantâneo (optimistic update) e persistência local.
- **Gerenciamento de Perfil:** Visualização com banner estilizado, foto de perfil, bio e formulário de edição com validações.
- **Design System Dark Mode:** Interface construída com **Tailwind CSS**, inspirada nas principais plataformas de streaming (Spotify/Apple Music), com micro-interações, tipografia Inter e suporte completo a dispositivos móveis.

---

## 🛠️ Stack Tecnológica & Decisões Arquiteturais

| Tecnologia | Finalidade | Por que foi escolhida? |
| :--- | :--- | :--- |
| **React 18 + Vite** | Framework & Build Tool | Alta performance no desenvolvimento, HMR instantâneo e suporte ao padrão de ponta do ecossistema. |
| **TypeScript** | Superset tipado | Garante segurança em tempo de compilação, interfaces para respostas da API e redução de bugs. |
| **Tailwind CSS** | Estilização Utilitária | Interface fluida, consistente e rápida de iterar, com paleta Dark Mode e design responsivo. |
| **Zustand** | Gerenciamento de Estado | Leveza, ausência de boilerplate (ao contrário de Redux) e facilidade para desacoplar lógica das telas (`useAuthStore`, `useFavoritesStore`, `usePlayerStore`). |
| **Axios** | Cliente HTTP | Instância centralizada (`api.ts`), tipagem facilitada de responses e tratamento de timeouts. |
| **Vitest + RTL** | Testes Automatizados | Execução ultrarrápida, compatibilidade nativa com ESM e cobertura de testes de integração e unitários. |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada)
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Ludson96/project-trybe-tunes.git
cd project-trybe-tunes
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse a aplicação no navegador em `http://localhost:5173`.

---

## 🧪 Execução dos Testes

Para rodar a suíte de testes com **Vitest**:

```bash
# Executa todos os testes e exibe o relatório de cobertura/sucesso
npm run test

# Modo interativo com watch
npm run test:watch
```

Para verificar a integridade da tipagem TypeScript e gerar o bundle de produção:

```bash
npm run build
```

---

## 📁 Estrutura de Diretórios

```text
src/
├── components/         # Componentes reutilizáveis (Header, MusicCard, GlobalPlayer)
├── pages/              # Páginas da aplicação (Login, Search, Album, Favorites, Profile, ProfileEdit)
├── services/           # Clientes HTTP Axios e persistência (api, searchAlbumsAPI, musicsAPI, etc.)
├── store/              # Gerenciamento de estado global com Zustand (Auth, Favorites, Player)
├── tests/              # Suíte de testes com Vitest e Testing Library
├── types/              # Interfaces centrais TypeScript
├── App.tsx             # Roteamento e orquestração da aplicação
├── index.css           # Configurações do Tailwind CSS e diretivas globais
└── main.tsx            # Ponto de entrada React 18
```

---

Feito com 💚 por [Ludson](https://github.com/Ludson96).
