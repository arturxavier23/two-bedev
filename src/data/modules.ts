// lista dos modulos do app
// cada modulo tem varias fases dentro dele

export type Module = {
  id: number;
  title: string;
  subtitle: string;
  color: string[]; // cores do gradiente do card
};

export const modulesData: Module[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    subtitle: "Fundamentos de JavaScript",
    color: ["#f59e0b", "#b45309"],
  },
  {
    id: 2,
    title: "Git & Version Control",
    subtitle: "Controle de versão com Git",
    color: ["#ef4444", "#7f1d1d"],
  },
  {
    id: 3,
    title: "APIs & RESTful Services",
    subtitle: "APIs e serviços RESTful",
    color: ["#06b6d4", "#0e7490"],
  },
  {
    id: 4,
    title: "Database Concepts",
    subtitle: "Conceitos de banco de dados",
    color: ["#312e81", "#1e1b4b"],
  },
];
