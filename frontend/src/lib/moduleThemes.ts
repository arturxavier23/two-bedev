export interface ModuleTheme {
  gradient: string;       // tailwind gradient classes
  hsl: string;            // raw HSL for inline styles e.g. "48 90% 55%"
  text: string;           // css color value
  bg: string;             // css color value
  border: string;         // css color with alpha
  glowShadow: string;     // box-shadow value
  strongGlow: string;     // stronger glow for current node
}

export const moduleThemes: Record<string, ModuleTheme> = {
  js: {
    gradient: "from-[hsl(48,90%,55%)] to-[hsl(36,95%,50%)]",
    hsl: "48 90% 55%",
    text: "hsl(48,90%,55%)",
    bg: "hsl(48,90%,55%)",
    border: "hsl(48 90% 55% / 0.2)",
    glowShadow: "0 0 12px hsl(48 90% 55% / 0.3)",
    strongGlow: "0 0 20px hsl(48 90% 55% / 0.5)",
  },
  git: {
    gradient: "from-[hsl(12,85%,55%)] to-[hsl(0,75%,50%)]",
    hsl: "12 85% 55%",
    text: "hsl(12,85%,55%)",
    bg: "hsl(12,85%,55%)",
    border: "hsl(12 85% 55% / 0.2)",
    glowShadow: "0 0 12px hsl(12 85% 55% / 0.3)",
    strongGlow: "0 0 20px hsl(12 85% 55% / 0.5)",
  },
  api: {
    gradient: "from-[hsl(195,80%,55%)] to-[hsl(210,85%,50%)]",
    hsl: "195 80% 55%",
    text: "hsl(195,80%,55%)",
    bg: "hsl(195,80%,55%)",
    border: "hsl(195 80% 55% / 0.2)",
    glowShadow: "0 0 12px hsl(195 80% 55% / 0.3)",
    strongGlow: "0 0 20px hsl(195 80% 55% / 0.5)",
  },
  backend: {
    gradient: "from-[hsl(262,80%,60%)] to-[hsl(280,70%,55%)]",
    hsl: "262 80% 60%",
    text: "hsl(262,80%,60%)",
    bg: "hsl(262,80%,60%)",
    border: "hsl(262 80% 60% / 0.2)",
    glowShadow: "0 0 12px hsl(262 80% 60% / 0.3)",
    strongGlow: "0 0 20px hsl(262 80% 60% / 0.5)",
  },
  db: {
    gradient: "from-[hsl(150,70%,45%)] to-[hsl(170,65%,40%)]",
    hsl: "150 70% 45%",
    text: "hsl(150,70%,45%)",
    bg: "hsl(150,70%,45%)",
    border: "hsl(150 70% 45% / 0.2)",
    glowShadow: "0 0 12px hsl(150 70% 45% / 0.3)",
    strongGlow: "0 0 20px hsl(150 70% 45% / 0.5)",
  },
};

export const getModuleTheme = (moduleId: string): ModuleTheme =>
  moduleThemes[moduleId] || moduleThemes.backend;
