import { describe, it, expect } from "vitest";
import { phasesData } from "@/data/questions";
import { modulesData } from "@/data/modules";

describe("perguntas", () => {
  it("tem 20 fases no total", () => {
    expect(phasesData.length).toBe(20);
  });

  it("cada fase tem 5 perguntas", () => {
    phasesData.forEach((fase) => {
      expect(fase.questions.length).toBe(5);
    });
  });

  it("cada pergunta tem 4 opcoes", () => {
    phasesData.forEach((fase) => {
      fase.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
      });
    });
  });

  it("correctAnswer ta dentro do range de opcoes", () => {
    phasesData.forEach((fase) => {
      fase.questions.forEach((q) => {
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(q.options.length);
      });
    });
  });

  it("total de perguntas e 100", () => {
    const total = phasesData.reduce((acc, fase) => acc + fase.questions.length, 0);
    expect(total).toBe(100);
  });
});

describe("modulos", () => {
  it("tem 4 modulos", () => {
    expect(modulesData.length).toBe(4);
  });

  it("cada modulo tem slug unico", () => {
    const slugs = modulesData.map((m) => m.slug);
    const unicos = new Set(slugs);
    expect(unicos.size).toBe(slugs.length);
  });

  it("cada modulo tem 5 fases associadas", () => {
    modulesData.forEach((mod) => {
      const fases = phasesData.filter((p) => p.moduleId === mod.id);
      expect(fases.length).toBe(5);
    });
  });
});