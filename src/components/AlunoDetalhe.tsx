"use client";

import Link from "next/link";
import { useData } from "@/context/DataContext";

export default function AlunoDetalhe({ ra }: { ra: string }) {
  const { alunos, matriculas, disciplinas, pronto } = useData();
  const aluno = alunos.find((a) => String(a.ra) === ra);

  if (!aluno) {
    if (!pronto) return <p>Carregando...</p>;
    return (
      <>
        <h1>Aluno não encontrado</h1>
        <p className="erro">Não existe aluno com o RA {ra}.</p>
        <Link href="/alunos" className="btn">
          Voltar à listagem
        </Link>
      </>
    );
  }

  const cursadas = matriculas
    .filter((m) => m.student_ra === aluno.ra)
    .map((m) => disciplinas.find((d) => d.id === m.course_id))
    .filter((d) => d !== undefined);

  return (
    <>
      <h1>{aluno.name}</h1>
      <dl className="detalhes">
        <dt>RA</dt>
        <dd>{aluno.ra}</dd>
        <dt>Nome completo</dt>
        <dd>{aluno.name}</dd>
        <dt>Disciplinas matriculadas</dt>
        <dd>
          {cursadas.length === 0 ? (
            "Nenhuma"
          ) : (
            <ul className="chips">
              {cursadas.map((d) => (
                <li key={d.id}>{d.name}</li>
              ))}
            </ul>
          )}
        </dd>
      </dl>
      <Link href="/alunos" className="btn">
        Voltar à listagem
      </Link>
    </>
  );
}