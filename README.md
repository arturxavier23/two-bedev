# 🐝 Two-BeDev

**"Level Up Your English, Level Up Your Career"**

Aplicativo mobile gamificado para aprendizado de inglês técnico voltado para profissionais e estudantes de TI.

> **Projeto Integrador VI** — Engenharia de Software (6º semestre)  
> **Orientador:** Prof. Brendo Vale  
> **Equipe:** alGURItmo

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Equipe](#-equipe)

---

## 📖 Sobre o Projeto

O **Two-BeDev** é um aplicativo que utiliza **gamificação** para incentivar o aprendizado contínuo de inglês técnico para TI. O app oferece:

- **Sistema de XP e Níveis** — Pontuação por ações completadas
- **Badges e Conquistas** — Recompensas visuais por metas atingidas
- **Leaderboard** — Ranking entre usuários
- **Lições e Exercícios** — Conteúdo contextualizado para TI
- **Integração com GitHub e Stack Overflow** — Vocabulário técnico real

**Alinhamento:** ODS 4 — Educação de Qualidade (ONU)

---

## 🛠 Stack Tecnológica

### Backend

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Node.js** | 20.x LTS | Runtime JavaScript de alta performance, grande ecossistema npm, suporte a async/await nativo. Versão LTS garante estabilidade e suporte de longo prazo. |
| **Express** | 4.x | Framework minimalista e flexível para APIs RESTful. Ampla documentação, middleware ecosystem robusto, curva de aprendizado baixa. |
| **PostgreSQL** | 16 | Banco relacional robusto para modelagem de entidades complexas (usuários, XP, níveis, badges). Suporte a JSON, transações ACID, escalabilidade comprovada. |
| **JWT** | - | Padrão de autenticação stateless, ideal para APIs REST e apps mobile. Permite validação sem consulta ao banco a cada requisição. |
| **Docker** | - | Containerização para ambiente de desenvolvimento padronizado. Elimina "funciona na minha máquina", facilita onboarding de novos devs. |

### Frontend Mobile

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React Native** | 0.74+ | Framework cross-platform que permite desenvolvimento iOS e Android com uma única codebase. Grande comunidade, componentes nativos, hot reload. |
| **Expo** | SDK 51+ | Facilita o desenvolvimento React Native sem configuração nativa complexa. Expo Router para navegação, EAS para builds, OTA updates. |
| **TypeScript** | 5.x | Tipagem estática que reduz bugs em runtime, melhora autocomplete e refatoração. Essencial para manutenibilidade em projetos de médio/grande porte. |
| **Zustand** | 4.x | Gerenciador de estado leve e performático. API simples, sem boilerplate, suporte a persist com AsyncStorage para manter sessão do usuário. |
| **Axios** | 1.x | Cliente HTTP com suporte a interceptors (injeção automática de JWT), tratamento de erros centralizado, timeout configurável. |

### DevOps & Ferramentas

| Tecnologia | Justificativa |
|------------|---------------|
| **GitHub Actions** | CI/CD integrado ao repositório, gratuito para projetos open source, configuração via YAML. |
| **Docker Compose** | Orquestração de múltiplos containers (app + banco) em ambiente local com um único comando. |
| **Expo EAS** | Build e distribuição de apps mobile sem necessidade de máquina Mac para iOS. |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Git** — [Download](https://git-scm.com/downloads)
- **Docker** e **Docker Compose** — [Download](https://www.docker.com/products/docker-desktop)
- **Node.js 20+** — [Download](https://nodejs.org/) (para desenvolvimento mobile)
- **Expo CLI** — Instalado via npm (instruções abaixo)

### Verificar instalação

```bash
git --version        # git version 2.x.x
docker --version     # Docker version 24.x.x
docker compose version  # Docker Compose version v2.x.x
node --version       # v20.x.x
npm --version        # 10.x.x
```

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/arturxavier23/two-bee-dev.git
cd two-bee-dev
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# .env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=meu_banco
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

### 3. Subir o ambiente com Docker

```bash
# Construir e iniciar os containers (backend + PostgreSQL)
docker compose up --build

# Ou em modo detached (background)
docker compose up --build -d
```

### 4. Verificar se está funcionando

Acesse no navegador ou via curl:

```bash
curl http://localhost:3000
# Resposta esperada: "App rodando. Banco conectado. Hora: ..."
```

### 5. Parar os containers

```bash
docker compose down

# Para remover também os volumes (dados do banco)
docker compose down -v
```

---

## 📁 Estrutura do Projeto

```
two-bee-dev/
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI/CD
├── server.js               # Servidor Express (entrada do backend)
├── package.json            # Dependências do Node.js
├── Dockerfile              # Imagem Docker do backend
├── docker-compose.yml      # Orquestração dos containers
├── .env                    # Variáveis de ambiente (não versionado)
├── .gitignore
├── .dockerignore
└── README.md               # Este arquivo
```

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Nicolly Mendes Cescon | Scrum Master / Dev Backend | [@nicollymendes](https://github.com/nicollymendes) |
| João Pedro Faccio | Scrum Master / Dev Frontend | - |
| Artur Xavier | Dev Backend | [@arturxavier23](https://github.com/arturxavier23) |
| João Paulo Kaezer | UX/UI Designer | - |
| Thiago Caleb | QA / Tester | - |

---

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos como parte do Projeto Integrador V.

---

**Two-BeDev** © 2026 — Equipe alGURItmo
