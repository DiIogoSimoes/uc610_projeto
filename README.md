
## WeatherSimoes (Meteo App) 🌦️

Aplicação de meteorologia desenvolvida em **React**, focada na visualização de dados climáticos. O projeto utiliza **Vite** para uma experiência de desenvolvimento rápida e incorpora bibliotecas modernas para gestão de estado, rotas e visualização de gráficos.

## 🛠️ Tecnologias Utilizadas

O núcleo do projeto é construído com as seguintes ferramentas e bibliotecas:

* **Core & Build:**
    * [React](https://react.dev/) - Biblioteca principal para construção da interface.
    * [Vite](https://vitejs.dev/) - Build tool e ambiente de desenvolvimento.
* **Gestão de Estado:**
    * [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux - Para gestão global do estado da aplicação.
* **Navegação:**
    * [React Router](https://reactrouter.com/) - Gestão de rotas e navegação entre páginas.
* **UI & Visualização:**
    * [Bootstrap](https://getbootstrap.com/) - Framework CSS para estilização e componentes responsivos.
    * [Recharts](https://recharts.org/) - Biblioteca para criação de gráficos meteorológicos.
* **Utilizadores:**
    * [Zod](https://zod.dev/) - Validação de esquemas e dados (ex: respostas de API).
    * ESLint - Ferramenta de linting para manter a qualidade do código.

## 📂 Estrutura do Projeto

A aplicação encontra-se na pasta `meteo-app`. A estrutura principal de diretórios é:


weatherSimoes/
└── meteo-app/
    ├── src/
    │   ├── assets/       # Imagens e ícones
    │   ├── components/   # Componentes reutilizáveis (UI e Meteorologia)
    │   ├── pages/        # Páginas da aplicação (Rotas)
    │   ├── services/     # Serviços de API e lógica de dados
    │   └── utils/        # Funções auxiliares
    ├── public/           # Arquivos estáticos
    └── vite.config.js    # Configuração do Vite

    
## 🚀 Instalação e Execução
Pré-requisitos: Certifique-se de ter o Node.js instalado.

Aceda à pasta do projeto:
cd weatherSimoes/meteo-app

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
npm run dev

A aplicação ficará disponível geralmente em http://localhost:5173

## ⚙️ Scripts Disponíveis
No diretório do projeto, pode executar:
npm run dev: Inicia a aplicação em modo de desenvolvimento.
npm run build: Cria a versão otimizada para produção na pasta dist.
npm run lint: Verifica o código à procura de erros ou problemas de estilo.
