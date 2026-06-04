import { describe, it, expect, beforeEach } from "vitest";
import { getProgress, saveProgress, addXP, completePhase, getLevel, updateUserName } from "@/lib/progress";

// limpa o localStorage antes de cada teste
// pra um teste nao afetar o outro
beforeEach(() => {
  localStorage.clear();
});

describe("getProgress", () => {
  it("retorna valores padrao quando nao tem nada salvo", () => {
    const progress = getProgress();
    expect(progress.userName).toBe("Aluno");
    expect(progress.totalXP).toBe(0);
    expect(progress.completedPhases).toEqual([]);
  });

  it("retorna dados salvos no localStorage", () => {
    saveProgress({ userName: "Matheus", totalXP: 500, completedPhases: [1, 2] });
    const progress = getProgress();
    expect(progress.userName).toBe("Matheus");
    expect(progress.totalXP).toBe(500);
    expect(progress.completedPhases).toEqual([1, 2]);
  });
});

describe("addXP", () => {
  it("soma xp no total", () => {
    addXP(150);
    const progress = getProgress();
    expect(progress.totalXP).toBe(150);
  });

  it("acumula xp em varias chamadas", () => {
    addXP(100);
    addXP(200);
    addXP(50);
    const progress = getProgress();
    expect(progress.totalXP).toBe(350);
  });
});

describe("completePhase", () => {
  it("adiciona fase na lista de completadas", () => {
    completePhase(1);
    const progress = getProgress();
    expect(progress.completedPhases).toContain(1);
  });

  it("nao duplica fase que ja foi completada", () => {
    completePhase(1);
    completePhase(1);
    const progress = getProgress();
    expect(progress.completedPhases.filter((p) => p === 1).length).toBe(1);
  });

  it("adiciona varias fases diferentes", () => {
    completePhase(1);
    completePhase(3);
    completePhase(5);
    const progress = getProgress();
    expect(progress.completedPhases).toEqual([1, 3, 5]);
  });
});

describe("getLevel", () => {
  it("nivel 1 com 0 xp", () => {
    expect(getLevel(0)).toBe(1);
  });

  it("nivel 1 com 499 xp", () => {
    expect(getLevel(499)).toBe(1);
  });

  it("nivel 2 com 500 xp", () => {
    expect(getLevel(500)).toBe(2);
  });

  it("nivel 3 com 1200 xp", () => {
    expect(getLevel(1200)).toBe(3);
  });
});

describe("updateUserName", () => {
  it("atualiza o nome do usuario", () => {
    updateUserName("Nicolly");
    const progress = getProgress();
    expect(progress.userName).toBe("Nicolly");
  });
});