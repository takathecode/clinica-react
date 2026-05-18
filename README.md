# 🏥 Sistema de Gestão Clínica - MedCore
## Guia Completo de Instalação, Configuração e Uso

Este documento foi criado para orientar alunos e desenvolvedores sobre como configurar e executar o **MedCore** em ambiente local. O sistema é uma plataforma moderna para gestão de clínicas médicas, focada em eficiência e usabilidade.

---

## 1️⃣ Introdução ao Projeto

O **MedCore** é uma aplicação web (SPA - Single Page Application) desenvolvida para facilitar o dia a dia de clínicas médicas. Ele permite a gestão centralizada de pacientes, médicos e agendamentos, oferecendo uma visão analítica através de um dashboard intuitivo.

**Tecnologias principais:**
*   **React 19:** Biblioteca JavaScript para construção de interfaces.
*   **Vite:** Ferramenta de build de próxima geração para um desenvolvimento ultra-rápido.
*   **Tailwind CSS:** Framework para estilização moderna e responsiva.
*   **Lucide Icons:** Biblioteca de ícones profissionais.

---

## 🚀 Funcionalidades em Detalhe

Para a sua apresentação, aqui estão os destaques do que o sistema já faz:

*   **📊 Dashboard de Métricas:** Exibe cards com o total de pacientes, médicos cadastrados e consultas agendadas, permitindo uma visão gerencial instantânea.
*   **👥 Cadastro de Pacientes:** Uma interface limpa para visualizar a lista de pacientes com filtros rápidos.
*   **🩺 Gestão de Profissionais:** Organização de médicos por especialidade, facilitando a busca no momento do agendamento.
*   **📅 Sistema de Agendamento:** Interface dedicada para marcar e visualizar consultas médicas.
*   **📱 Responsividade:** O sistema utiliza **Tailwind CSS**, o que significa que ele funciona bem tanto em monitores grandes quanto em tablets.

---

## ⚛️ React.js: A Tecnologia Principal

O **React.js** é a peça central deste projeto. Criado pelo Facebook, ele não é apenas uma "linguagem", mas uma biblioteca poderosa que dita como o sistema se comporta.

### Por que usar React?
1.  **Componentização:** Imagine o site como blocos de LEGO. Criamos o "botão" uma vez e o usamos em 10 lugares diferentes. Se precisarmos mudar a cor, mudamos em um único arquivo e todos se atualizam.
2.  **Virtual DOM (Performance):** O React é inteligente. Ele não atualiza a página toda quando você clica em algo; ele atualiza apenas o pequeno pedaço que mudou. Isso deixa o sistema extremamente rápido.
3.  **SPA (Single Page Application):** O usuário navega entre as abas (Pacientes, Médicos) sem que o navegador precise carregar uma nova página. Tudo acontece dentro de uma "página única".

### Como o React roda neste projeto?
Para que o código React "ganhe vida", ele passa por um processo chamado **Build/Serve** através do Vite:
*   O comando `npm install` baixa o motor do React para a pasta `node_modules`.
*   O comando `npm run dev` inicia o servidor que interpreta os arquivos `.jsx` (React) e os transforma em código que o navegador entende.

---

## 2️⃣ Pré-requisitos (O que instalar)

Antes de começar, você precisa preparar seu computador com as ferramentas abaixo:

### 🟢 Node.js e npm
*   **O que é:** O Node.js é o ambiente que permite rodar JavaScript no seu computador. O **npm** é o gerenciador de pacotes que baixa as bibliotecas do projeto (ele já vem instalado com o Node).
*   **Como baixar:** Acesse [nodejs.org](https://nodejs.org/) e baixe a versão **LTS** (recomendada para estabilidade).
*   **Verificação:** Abra o terminal (CMD ou PowerShell) e digite:
    ```bash
    node -v
    npm -v
    ```
    *Se aparecerem números de versão, a instalação foi um sucesso.*

### 🔵 Git (Opcional, mas recomendado)
*   **O que é:** Ferramenta para baixar (clonar) projetos do GitHub.
*   **Como baixar:** Acesse [git-scm.com](https://git-scm.com/).
*   **Verificação:** Digite `git --version` no terminal.

### 🟡 Editor de Código e Navegador
*   **Editor:** Recomendamos o **VS Code** ([code.visualstudio.com](https://code.visualstudio.com/)).
*   **Navegador:** Google Chrome, Microsoft Edge ou Firefox (versões atualizadas).

---

## 3️⃣ Passo a Passo para Rodar o Projeto

Siga estas etapas na ordem exata para evitar erros:

### Passo 1: Baixar o Projeto
Se você tem o Git instalado, use o comando abaixo no terminal. Caso contrário, baixe o arquivo `.zip` e extraia os arquivos em uma pasta de sua escolha.
```bash
git clone https://github.com/seu-usuario/sistema-clinica.git
```

### Passo 2: Abrir a Pasta
Abra o **VS Code**, vá em `Arquivo > Abrir Pasta...` e selecione a pasta `Sistema_Clinica`.

### Passo 3: Abrir o Terminal
No VS Code, use o atalho ``Ctrl + ` `` (crase) ou vá no menu superior em `Terminal > Novo Terminal`.

### Passo 4: Instalar as Dependências
Este comando vai ler o arquivo `package.json` e baixar tudo o que o projeto precisa para funcionar (cria a pasta `node_modules`).
```bash
npm install
```

### Passo 5: Iniciar o Servidor
Agora, vamos colocar o sistema para rodar:
```bash
npm run dev
```

### Passo 6: Acessar no Navegador
Após o comando acima, o terminal mostrará um link (geralmente `http://localhost:5173`). Segure `Ctrl` e clique no link ou copie e cole no seu navegador.

---

## 4️⃣ Entendendo o Ambiente

*   **Vite:** É o "motor" que compila seu código em tempo real enquanto você programa.
*   **React:** É a estrutura que organiza o site em componentes reutilizáveis.
*   **node_modules/**: Pasta que contém todas as bibliotecas baixadas. **Nunca** a edite manualmente.
*   **package.json**: O "manual" do projeto. Ele diz o nome do sistema, a versão e quais bibliotecas são obrigatórias.

---

## 📂 Organização das Pastas (Estrutura src)

Para explicar o código na frente da turma, entenda o que cada pasta faz:

*   `src/components/`: Contém os elementos que aparecem em várias telas (Botões, Sidebar, Cards).
*   `src/pages/`: Contém as telas completas (Dashboard, Pacientes, Médicos).
*   `src/context/`: Onde fica o "cérebro" dos dados. Usamos a **Context API** para que os dados não se percam ao mudar de página.
*   `src/services/`: Contém os dados de teste (Mock Data) que alimentam o sistema.
*   `src/App.jsx`: É o arquivo principal que define as rotas (endereços) do site.

---

## 5️⃣ Possíveis Erros e Soluções

| Erro | Causa Comum | Solução |
| :--- | :--- | :--- |
| `'node' não é reconhecido` | Node.js não foi instalado ou não está no PATH. | Reinstale o Node.js e reinicie o computador. |
| `Port 5173 is already in use` | Você já tem outro projeto rodando. | O Vite perguntará se quer usar outra porta, digite `y` e dê Enter. |
| `npm ERR! cascade...` | Versão do Node muito antiga. | Atualize o Node.js para a versão LTS mais recente. |
| `Module not found` | Esqueceu de rodar o install. | Digite `npm install` novamente no terminal. |

---

## 6️⃣ Instruções para Produção (Build)

Quando o projeto estiver pronto para ser "publicado" na internet:
1.  Execute: `npm run build`
2.  Isso criará a pasta **`dist/`**.
3.  **Pasta `dist/`**: Contém o código final otimizado, minificado e pronto para ser colocado em qualquer servidor web. É essa pasta que você envia para o ar.

---
**MedCore** - Projeto Acadêmico de Sistemas de Informação.
