"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { alunos as alunosIniciais, type Aluno } from "@/data/alunos";
import { matriculas as matriculasIniciais, type Matricula } from "@/data/matriculas";
import { disciplinas, type Disciplina } from "@/data/disciplinas";

const CHAVE_ALUNOS = "atv1:alunos";
const CHAVE_MATRICULAS = "atv1:matriculas";

export type Resultado = { ok: true } | { ok: false; erro: string };

type DataContextValue = {
  alunos: Aluno[];
  matriculas: Matricula[];
  disciplinas: Disciplina[];
  pronto: boolean;
  adicionarAluno: (aluno: Aluno) => Resultado;
  adicionarMatricula: (matricula: Matricula) => Resultado;
};

const DataContext = createContext<DataContextValue | null>(null);

function ler<T>(chave: string, padrao: T[]): T[] {
  try {
    const bruto = localStorage.getItem(chave);
    if (bruto === null) {
      // Primeiro acesso: grava os registros iniciais.
      localStorage.setItem(chave, JSON.stringify(padrao));
      return padrao;
    }
    const dados = JSON.parse(bruto);
    return Array.isArray(dados) ? (dados as T[]) : padrao;
  } catch {
    return padrao;
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [alunos, setAlunos] = useState<Aluno[]>(alunosIniciais);
  const [matriculas, setMatriculas] = useState<Matricula[]>(matriculasIniciais);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setAlunos(ler(CHAVE_ALUNOS, alunosIniciais));
    setMatriculas(ler(CHAVE_MATRICULAS, matriculasIniciais));
    setPronto(true);
  }, []);

  const adicionarAluno = useCallback(
    (aluno: Aluno): Resultado => {
      if (alunos.some((a) => a.ra === aluno.ra)) {
        return { ok: false, erro: `Já existe um aluno com o RA ${aluno.ra}.` };
      }
      const proximo = [...alunos, aluno];
      try {
        localStorage.setItem(CHAVE_ALUNOS, JSON.stringify(proximo));
      } catch {
        return {
          ok: false,
          erro: "Não foi possível salvar o cadastro no navegador. Nada foi cadastrado.",
        };
      }
      setAlunos(proximo);
      return { ok: true };
    },
    [alunos],
  );

  const adicionarMatricula = useCallback(
    (m: Matricula): Resultado => {
      if (!alunos.some((a) => a.ra === m.student_ra)) {
        return { ok: false, erro: "Aluno não encontrado." };
      }
      if (!disciplinas.some((d) => d.id === m.course_id)) {
        return { ok: false, erro: "Disciplina não encontrada." };
      }
      if (matriculas.some((x) => x.student_ra === m.student_ra && x.course_id === m.course_id)) {
        return { ok: false, erro: "Este aluno já está matriculado nesta disciplina." };
      }
      const proximo = [...matriculas, m];
      try {
        localStorage.setItem(CHAVE_MATRICULAS, JSON.stringify(proximo));
      } catch {
        return {
          ok: false,
          erro: "Não foi possível salvar a matrícula no navegador. Nada foi cadastrado.",
        };
      }
      setMatriculas(proximo);
      return { ok: true };
    },
    [alunos, matriculas],
  );

  const value = useMemo(
    () => ({ alunos, matriculas, disciplinas, pronto, adicionarAluno, adicionarMatricula }),
    [alunos, matriculas, pronto, adicionarAluno, adicionarMatricula],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData deve ser usado dentro de DataProvider");
  return ctx;
}