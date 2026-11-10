"use client";

import Link from "next/link";
import { useData } from "@/context/DataContext";

export default function AlunosPage() {
  const { alunos } = useData();
  return (
    <>
      <h1>Alunos</h1>
      <p className="total">
        Total de alunos: <strong>{alunos.length}</strong>
      </p>
      {alunos.length === 0 ? (
        <p className="vazio">Nenhum aluno cadastrado.</p>
      ) : (
        <ul className="lista">
          {alunos.map((a) => (
            <li key={a.ra}>
              <Link href={`/alunos/${a.ra}`}>
                <span className="lista-nome">{a.name}</span>
                <span className="lista-ra">RA {a.ra}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}