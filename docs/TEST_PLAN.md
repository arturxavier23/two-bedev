# 🧪 Plano de Testes — Two-BeDev

## Objetivo

Garantir a qualidade do aplicativo Two-BeDev através de testes funcionais, de usabilidade, performance e segurança.

## Escopo de Testes

### 1. Testes Funcionais

| Módulo | Casos de Teste |
|--------|----------------|
| **Autenticação** | Login, cadastro, recuperação de senha, logout |
| **Gamificação** | Ganho de XP, subida de nível, desbloqueio de badges |
| **Lições** | Carregar lição, responder exercício, calcular pontuação |
| **Leaderboard** | Exibir ranking, atualizar posição |
| **Perfil** | Visualizar dados, editar informações |

### 2. Testes de Usabilidade

- [ ] Navegação intuitiva entre telas
- [ ] Feedback visual em ações do usuário
- [ ] Mensagens de erro claras e úteis
- [ ] Consistência visual entre componentes
- [ ] Acessibilidade (contraste, tamanho de fonte)

### 3. Testes de Performance

| Métrica | Critério de Aceite |
|---------|-------------------|
| Tempo de resposta da API | < 2 segundos |
| Carregamento de tela | < 3 segundos |
| Uso de memória | Sem memory leaks |
| Usuários simultâneos | Suportar 100+ |

### 4. Testes de Segurança

- [ ] Autenticação JWT válida
- [ ] Proteção contra SQL Injection
- [ ] Comunicação via HTTPS/TLS
- [ ] Senhas armazenadas com hash (bcrypt)
- [ ] Tokens com expiração configurada

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| Jest | Testes unitários |
| React Native Testing Library | Testes de componentes |
| Postman | Testes de API |
| k6 | Testes de carga |

## Ambiente de Testes

- **Backend:** Docker local (porta 3000)
- **Banco:** PostgreSQL 16 (porta 5432)
- **App:** Expo Go ou emulador

---

*Documento criado por Thiago Caleb — QA / Tester*
