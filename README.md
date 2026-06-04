# 🐝 Two-BeDev

**"Level Up Your English, Level Up Your Career"**

PWA gamificado para aprendizado de inglês técnico voltado para profissionais e estudantes de TI.

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

O **Two-BeDev** é um Progressive Web App (PWA) que utiliza **gamificação** para incentivar o aprendizado contínuo de inglês técnico para TI. O app oferece:

- **Sistema de XP e Níveis** — Pontuação por exercícios completados
- **Lições por Módulo** — Conteúdo organizado em módulos temáticos (JavaScript, Git, APIs, Banco de Dados)
- **Quiz Interativo** — Exercícios de múltipla escolha com feedback imediato
- **Leaderboard** — Ranking entre usuários
- **Progresso Persistente** — XP e fases completadas salvos automaticamente
- **Design Dark/Neon** — Interface moderna e imersiva

**Alinhamento:** ODS 4 — Educação de Qualidade (ONU)

---

## 🛠 Stack Tecnológica

### Frontend (PWA)

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 18.x | Biblioteca para interfaces reativas com componentização e grande ecossistema |
| **Vite** | 5.x | Build tool moderna com hot reload instantâneo e builds otimizados |
| **TypeScript** | 5.x | Tipagem estática que reduz bugs em runtime e melhora manutenibilidade |
| **Tailwind CSS** | 3.x | Utility-first CSS para prototipagem rápida e design system consistente |
| **shadcn/ui (Radix)** | - | Componentes acessíveis e customizáveis com tema dark/neon |
| **Framer Motion** | 11.x | Animações fluidas e declarativas para micro-interações de gamificação |
| **React Router DOM** | 6.x | Navegação SPA com rotas dinâmicas para módulos e lições |
| **TanStack React Query** | 5.x | Gerenciamento de estado assíncrono com cache automático |
| **Zod** | 3.x | Validação de formulários com tipagem TypeScript nativa |

### Backend (planejado)

| Tecnologia | Justificativa |
|------------|---------------|
| **Supabase** | PostgreSQL gerenciado, autenticação integrada, API REST automática, plano gratuito generoso |

### DevOps & Ferramentas

| Tecnologia | Justificativa |
|------------|---------------|
| **GitHub Actions** | CI/CD integrado ao repositório com lint e testes automatizados |
| **Vercel** | Deploy automático com preview por PR e domínio customizado |

---

## 📦 Pré-requisitos

- **Git** — [Download](https://git-scm.com/downloads)
- **Node.js 20+** — [Download](https://nodejs.org/)

### Verificar instalação

```bash
git --version   # git version 2.x.x
node --version  # v20.x.x
npm --version   # 10.x.x
```

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/arturxavier23/two-bedev.git
cd two-bedev/frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

### 4. Acessar no navegador

```
http://localhost:5173
```

### 5. Build de produção

```bash
npm run build
npm run preview
```

> **Nota:** O app é um PWA e pode ser instalado no celular acessando a URL pelo navegador e selecionando "Adicionar à tela inicial".

---

## 📁 Estrutura do Projeto

```
two-bedev/
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis (UI, navegação)
│   │   ├── pages/         # Telas do app (Home, Login, Lesson, etc.)
│   │   ├── hooks/         # Custom hooks (estado, responsividade)
│   │   ├── lib/           # Utilitários e configurações
│   │   ├── data/          # Dados de perguntas e módulos
│   │   ├── App.tsx        # Rotas e providers
│   │   └── main.tsx       # Entry point
│   ├── public/            # Assets estáticos
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── docs/
│   ├── FRONTEND_GUIDE.md
│   ├── TEST_PLAN.md
│   └── UI_DESIGN_SYSTEM.md
└── README.md
```

---

## 👥 Equipe

| Nome | Função | GitHub |
|------|--------|--------|
| Nicolly Mendes Cescon | Scrum Master / Dev Backend | [@nicollymendes](https://github.com/nicollymendes) |
| João Pedro Faccio | Scrum Master / Dev Frontend | @JoaoFaccio087 |
| Artur Xavier | Dev Backend | [@arturxavier23](https://github.com/arturxavier23) |
| João Paulo Kaezer | UX/UI Designer | @jpkaizer |
| Thiago Caleb | QA / Tester | [@thiagocaleb-br
](https://github.com/thiagocaleb-br) |

---

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos como parte do Projeto Integrador VI.

---

**Two-BeDev** © 2026 — Equipe alGURItmo
