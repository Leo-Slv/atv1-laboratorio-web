"use client";

import Link from "next/link";
import { useData } from "@/context/DataContext";

export default function MatriculasPage() {
  const { matriculas, alunos, disciplinas } = useData();
  return (
    <div className="container area" data-area="matriculas">
      <div className="titulo-linha">
        <h1>Matrículas</h1>
        <Link href="/matriculas/nova" className="btn">
          Nova matrícula
        </Link>
      </div>
      <p className="total">
        Total de matrículas: <strong>{matriculas.length}</strong>
      </p>
      {matriculas.length === 0 ? (
        <p className="vazio">Nenhuma matrícula cadastrada.</p>
      ) : (
        <div className="tabela-wrap">
          <table className="tabela">
            <thead>
              <tr>
                <th>RA</th>
                <th>Aluno</th>
                <th>Disciplina</th>
              </tr>
            </thead>
            <tbody>
              {matriculas.map((m) => (
                <tr key={`${m.student_ra}-${m.course_id}`}>
                  <td>{m.student_ra}</td>
                  <td>{alunos.find((a) => a.ra === m.student_ra)?.name ?? "—"}</td>
                  <td>{disciplinas.find((d) => d.id === m.course_id)?.name ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}