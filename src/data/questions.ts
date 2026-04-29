// tipos das perguntas e fases
export type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export type PhaseData = {
  phaseId: number;
  moduleId: number;
  title: string;
  questions: Question[];
};

// todas as perguntas organizadas por fase e modulo
export const phasesData: PhaseData[] = [
  // modulo 1 - javascript
  {
    phaseId: 1,
    moduleId: 1,
    title: "Variáveis e Tipos de Dados",
    questions: [
      { question: "Qual palavra-chave é usada para declarar uma variável que pode ser reatribuída?", options: ["const", "let", "static", "void"], correctAnswer: 1 },
      { question: "Qual é o resultado de 'typeof null' em JavaScript?", options: ["null", "undefined", "object", "string"], correctAnswer: 2 },
      { question: "Qual tipo de dado é usado para valores que podem ser verdadeiro ou falso?", options: ["String", "Number", "Boolean", "Symbol"], correctAnswer: 2 },
      { question: "Como você declara uma variável constante no JavaScript moderno?", options: ["var", "let", "fixed", "const"], correctAnswer: 3 },
      { question: "O que acontece quando uma variável é declarada mas não inicializada?", options: ["É null", "É undefined", "Lança um erro", "É 0"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 2,
    moduleId: 1,
    title: "Arrow Functions e Escopo",
    questions: [
      { question: "Qual sintaxe é usada para uma arrow function?", options: ["function() {}", "=>", "->", "func => {}"], correctAnswer: 1 },
      { question: "Arrow functions possuem seu próprio 'this'?", options: ["Sim", "Não", "Apenas em modo estrito", "Depende de quem chama"], correctAnswer: 1 },
      { question: "O que é 'escopo léxico'?", options: ["Escopo determinado em tempo de execução", "Escopo determinado pelo local onde foi declarado", "Apenas escopo global", "Um tipo de variável"], correctAnswer: 1 },
      { question: "Como escrever uma arrow function de uma linha com retorno implícito?", options: ["(x) => { return x }", "(x) => x", "x -> x", "function(x) { x }"], correctAnswer: 1 },
      { question: "Qual palavra-chave cria uma variável com escopo de bloco?", options: ["var", "let", "global", "static"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 3,
    moduleId: 1,
    title: "Métodos de Array",
    questions: [
      { question: "Qual método cria um novo array transformando cada elemento?", options: ["filter", "forEach", "map", "reduce"], correctAnswer: 2 },
      { question: "Qual método retorna apenas os elementos que atendem a uma condição?", options: ["find", "filter", "some", "every"], correctAnswer: 1 },
      { question: "Como reduzir um array a um único valor?", options: ["array.single()", "array.reduce()", "array.flat()", "array.sum()"], correctAnswer: 1 },
      { question: "Qual método verifica se pelo menos um elemento atende a um critério?", options: ["every", "some", "includes", "find"], correctAnswer: 1 },
      { question: "O método 'map()' modifica o array original?", options: ["Sim", "Não", "Às vezes", "Apenas se especificado"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 4,
    moduleId: 1,
    title: "Assincronicidade",
    questions: [
      { question: "O que 'async' retorna antes de uma função?", options: ["Um valor", "Uma Promise", "Undefined", "Um callback"], correctAnswer: 1 },
      { question: "Como aguardar a resolução de uma Promise em uma função async?", options: ["wait", "hold", "await", "then"], correctAnswer: 2 },
      { question: "Qual método trata erros em uma cadeia de Promises?", options: ["try", "catch", "final", "error"], correctAnswer: 1 },
      { question: "Qual é o estado de uma Promise que ainda não terminou?", options: ["Resolved", "Pending", "Fulfilled", "Rejected"], correctAnswer: 1 },
      { question: "O que é 'callback hell'?", options: ["Um bug de performance", "Chamadas assíncronas profundamente aninhadas", "Um erro de sintaxe", "Uma dependência circular"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 5,
    moduleId: 1,
    title: "Erros Comuns",
    questions: [
      { question: "Um erro causado por usar uma variável antes de ela existir é um:", options: ["SyntaxError", "ReferenceError", "TypeError", "RangeError"], correctAnswer: 1 },
      { question: "Qual erro ocorre ao tentar chamar algo que não é uma função?", options: ["CallError", "TypeError", "SyntaxError", "LogicError"], correctAnswer: 1 },
      { question: "Qual erro ocorre se o código tem estrutura gramatical inválida?", options: ["ReferenceError", "SyntaxError", "ParseError", "EvalError"], correctAnswer: 1 },
      { question: "Qual instrução é usada para tratar exceções?", options: ["if/else", "try/catch", "wait/stop", "start/end"], correctAnswer: 1 },
      { question: "Qual palavra-chave dispara manualmente um erro?", options: ["emit", "send", "throw", "reject"], correctAnswer: 2 },
    ],
  },

  // modulo 2 - git
  {
    phaseId: 6,
    moduleId: 2,
    title: "Fluxo Básico",
    questions: [
      { question: "Como mover alterações do diretório de trabalho para a área de stage?", options: ["git commit", "git push", "git add", "git move"], correctAnswer: 2 },
      { question: "Qual comando registra alterações no repositório local?", options: ["git save", "git upload", "git commit", "git ship"], correctAnswer: 2 },
      { question: "Como enviar commits locais para um servidor remoto?", options: ["git pull", "git push", "git fetch", "git send"], correctAnswer: 1 },
      { question: "Qual comando traz alterações do remoto e já faz merge?", options: ["git pull", "git fetch", "git clone", "git sync"], correctAnswer: 0 },
      { question: "Para que serve o arquivo '.gitignore'?", options: ["Listar contribuidores", "Fazer stage", "Ignorar arquivos", "Gerenciar branches"], correctAnswer: 2 },
    ],
  },
  {
    phaseId: 7,
    moduleId: 2,
    title: "Branches",
    questions: [
      { question: "Como criar e mudar para uma nova branch em um comando?", options: ["git branch -n", "git checkout -b", "git move", "git new"], correctAnswer: 1 },
      { question: "Qual comando junta duas branches?", options: ["git join", "git merge", "git connect", "git pull"], correctAnswer: 1 },
      { question: "Qual comando moderno troca de branch?", options: ["git switch", "git jump", "git branch", "git go"], correctAnswer: 0 },
      { question: "O que é 'HEAD'?", options: ["Primeiro commit", "Ponteiro da branch atual", "Servidor remoto", "Branch master"], correctAnswer: 1 },
      { question: "Como listar branches locais?", options: ["git list", "git show", "git branch", "git status"], correctAnswer: 2 },
    ],
  },
  {
    phaseId: 8,
    moduleId: 2,
    title: "Repositórios Remotos",
    questions: [
      { question: "Qual comando cria uma cópia local de um repositório remoto?", options: ["git clone", "git copy", "git fetch", "git pull"], correctAnswer: 0 },
      { question: "Como ver URLs dos repositórios remotos?", options: ["git remote -v", "git links", "git show-remote", "git config"], correctAnswer: 0 },
      { question: "Qual comando baixa dados sem fazer merge?", options: ["git pull", "git sync", "git fetch", "git get"], correctAnswer: 2 },
      { question: "Como adicionar um remote chamado origin?", options: ["git remote add origin URL", "git push origin URL", "git link origin URL", "git connect origin URL"], correctAnswer: 0 },
      { question: "O que é um fork?", options: ["Uma branch", "Um pull request", "Uma cópia do repositório", "Um repo deletado"], correctAnswer: 2 },
    ],
  },
  {
    phaseId: 9,
    moduleId: 2,
    title: "Comandos Avançados",
    questions: [
      { question: "Qual comando move commits para outra base?", options: ["git move", "git rebase", "git reset", "git shift"], correctAnswer: 1 },
      { question: "Como salvar temporariamente alterações não commitadas?", options: ["git hide", "git stash", "git save", "git pause"], correctAnswer: 1 },
      { question: "Aplicar um commit específico de outra branch:", options: ["git pick", "git cherry-pick", "git copy-commit", "git merge --single"], correctAnswer: 1 },
      { question: "Como remover um arquivo do stage?", options: ["git remove", "git reset HEAD <file>", "git delete", "git unstage"], correctAnswer: 1 },
      { question: "Flag para editar último commit:", options: ["--edit", "--fix", "--amend", "--update"], correctAnswer: 2 },
    ],
  },
  {
    phaseId: 10,
    moduleId: 2,
    title: "Colaboração",
    questions: [
      { question: "O que é um Pull Request?", options: ["Um comando git", "Pedido para mesclar código", "Erro", "Excluir código"], correctAnswer: 1 },
      { question: "Quando duas pessoas editam a mesma linha ocorre:", options: ["Crash", "Erro lógico", "Conflito de merge", "Erro de sync"], correctAnswer: 2 },
      { question: "O que é Code Review?", options: ["Rodar testes", "Revisar código", "Documentar", "Deletar código"], correctAnswer: 1 },
      { question: "Ver histórico de commits:", options: ["git history", "git log", "git show", "git status"], correctAnswer: 1 },
      { question: "O que faz squash?", options: ["Deleta branch", "Junta commits", "Ignora mudanças", "Reverte código"], correctAnswer: 1 },
    ],
  },

  // modulo 3 - apis
  {
    phaseId: 11,
    moduleId: 3,
    title: "Métodos HTTP",
    questions: [
      { question: "Qual método busca dados?", options: ["POST", "PUT", "GET", "DELETE"], correctAnswer: 2 },
      { question: "Qual método cria recurso?", options: ["GET", "POST", "FETCH", "CREATE"], correctAnswer: 1 },
      { question: "Atualiza recurso completo:", options: ["PATCH", "UPDATE", "PUT", "SET"], correctAnswer: 2 },
      { question: "Remove recurso:", options: ["REMOVE", "DELETE", "DROP", "CLEAR"], correctAnswer: 1 },
      { question: "Atualização parcial:", options: ["PUT", "PATCH", "MODIFY", "POST"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 12,
    moduleId: 3,
    title: "Status HTTP",
    questions: [
      { question: "200 significa:", options: ["Sucesso", "Erro", "Criado", "Sem conteúdo"], correctAnswer: 0 },
      { question: "Código de criação:", options: ["200", "201", "204", "401"], correctAnswer: 1 },
      { question: "404 significa:", options: ["Proibido", "Não encontrado", "Requisição inválida", "Pendente"], correctAnswer: 1 },
      { question: "Erro genérico servidor:", options: ["500", "501", "503", "504"], correctAnswer: 0 },
      { question: "401 significa:", options: ["Servidor offline", "Sem credenciais", "URL inválida", "Sem dados"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 13,
    moduleId: 3,
    title: "Componentes da Requisição",
    questions: [
      { question: "Onde vai Content-Type?", options: ["Body", "Query", "Headers", "Rota"], correctAnswer: 2 },
      { question: "?id=123 é:", options: ["Endpoint", "Query params", "Body", "Anchor"], correctAnswer: 1 },
      { question: "POST envia dados no:", options: ["Header", "Query", "Body", "Meta"], correctAnswer: 2 },
      { question: "Endpoint é:", options: ["URL do recurso", "Fim do código", "Banco", "Token"], correctAnswer: 0 },
      { question: "Path variável:", options: ["Parte dinâmica da URL", "Variável SQL", "Header", "Cookie"], correctAnswer: 0 },
    ],
  },
  {
    phaseId: 14,
    moduleId: 3,
    title: "Autenticação",
    questions: [
      { question: "JWT significa:", options: ["Java Web Token", "JSON Web Token", "Just Working Token", "Joint Web Team"], correctAnswer: 1 },
      { question: "Bearer token vai no:", options: ["Body", "Header", "Query", "URL"], correctAnswer: 1 },
      { question: "API Key é:", options: ["Senha DB", "Identificador de cliente", "Chave criptografia", "Arquivo"], correctAnswer: 1 },
      { question: "OAuth é:", options: ["Biblioteca", "Framework de autorização", "Banco", "Linguagem"], correctAnswer: 1 },
      { question: "Stateless significa:", options: ["Sem DB", "Cada request tem tudo", "Salva estado", "Offline"], correctAnswer: 1 },
    ],
  },
  {
    phaseId: 15,
    moduleId: 3,
    title: "Formatos",
    questions: [
      { question: "Formato mais comum:", options: ["XML", "JSON", "HTML", "TXT"], correctAnswer: 1 },
      { question: "JSON significa:", options: ["JavaScript Object Notation", "Java Serialized Object", "Joint Standard Object", "Just Simple Object"], correctAnswer: 0 },
      { question: "Ferramenta de teste API:", options: ["Postman", "Xcode", "Photoshop", "Word"], correctAnswer: 0 },
      { question: "Payload é:", options: ["Header size", "Dados enviados", "Erro", "Crash"], correctAnswer: 1 },
      { question: "Parse JSON:", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.read()"], correctAnswer: 1 },
    ],
  },

  // modulo 4 - banco de dados
  {
    phaseId: 16,
    moduleId: 4,
    title: "SQL Básico",
    questions: [
      { question: "Buscar dados:", options: ["GET", "FETCH", "SELECT", "QUERY"], correctAnswer: 2 },
      { question: "Inserir dados:", options: ["ADD", "CREATE", "INSERT", "POST"], correctAnswer: 2 },
      { question: "Filtrar resultados:", options: ["FILTER", "WHERE", "HAVING", "GROUP BY"], correctAnswer: 1 },
      { question: "Atualizar dados:", options: ["CHANGE", "UPDATE", "SET", "MODIFY"], correctAnswer: 1 },
      { question: "Deletar dados:", options: ["REMOVE", "CLEAR", "DELETE", "DROP"], correctAnswer: 2 },
    ],
  },
  {
    phaseId: 17,
    moduleId: 4,
    title: "Relacionamentos",
    questions: [
      { question: "INNER JOIN:", options: ["Combina registros correspondentes", "Tudo da esquerda", "Tudo da direita", "Tudo"], correctAnswer: 0 },
      { question: "LEFT JOIN:", options: ["Tudo da esquerda", "Tudo da direita", "Só iguais", "Nada"], correctAnswer: 0 },
      { question: "One-to-Many:", options: ["1 usuário vários posts", "1 usuário 1 email", "Sem relação", "Muitos iguais"], correctAnswer: 0 },
      { question: "Foreign Key:", options: ["Chave externa", "Senha", "Index", "Token"], correctAnswer: 0 },
      { question: "Cross Join:", options: ["Combina tudo com tudo", "Filtra", "Remove", "Otimiza"], correctAnswer: 0 },
    ],
  },
  {
    phaseId: 18,
    moduleId: 4,
    title: "Chaves e Restrições",
    questions: [
      { question: "Identificador único:", options: ["Foreign", "Unique", "Primary", "Main"], correctAnswer: 2 },
      { question: "Não permite vazio:", options: ["NOT EMPTY", "REQUIRED", "NOT NULL", "FILLABLE"], correctAnswer: 2 },
      { question: "Valores únicos:", options: ["UNIQUE", "DISTINCT", "DIFFERENT", "PRIMARY"], correctAnswer: 0 },
      { question: "Composite key:", options: ["Chave múltipla", "Fake", "Cloud", "Encrypt"], correctAnswer: 0 },
      { question: "Cascade delete:", options: ["Apaga relacionados", "Crash", "Speed", "Hide"], correctAnswer: 0 },
    ],
  },
  {
    phaseId: 19,
    moduleId: 4,
    title: "NoSQL vs SQL",
    questions: [
      { question: "Grupo NoSQL:", options: ["Tabela", "Collection", "Folder", "Set"], correctAnswer: 1 },
      { question: "Schema-less:", options: ["Sem estrutura fixa", "Sem segurança", "Sem nome", "Sem SQL"], correctAnswer: 0 },
      { question: "Melhor para dados estruturados:", options: ["NoSQL", "SQL", "CSV", "Excel"], correctAnswer: 1 },
      { question: "Escala horizontal:", options: ["Mais servidores", "Mais RAM", "Mais linhas", "Menos dados"], correctAnswer: 0 },
      { question: "SQL característica:", options: ["ACID", "Sem relação", "Dinâmico", "Lento"], correctAnswer: 0 },
    ],
  },
  {
    phaseId: 20,
    moduleId: 4,
    title: "Performance",
    questions: [
      { question: "Acelerar consultas:", options: ["Index", "SpeedUp", "Tracker", "Buffer"], correctAnswer: 0 },
      { question: "Otimização de query:", options: ["Menos recurso", "Apagar", "Nomear", "Rodar"], correctAnswer: 0 },
      { question: "Muitos índices:", options: ["Leitura rápida", "Escrita lenta", "Mais dados", "Nada"], correctAnswer: 1 },
      { question: "Full scan:", options: ["Ver todas linhas", "Busca rápida", "Backup", "Segurança"], correctAnswer: 0 },
      { question: "Normalização:", options: ["Menos redundância", "Apagar", "Formatar", "Converter"], correctAnswer: 0 },
    ],
  },
];
