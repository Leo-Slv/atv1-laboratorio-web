"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function NovaMatriculaPage() {
  const { alunos, disciplinas, adicionarMatricula } = useData();
  const router = useRouter();
  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [erro, setErro] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!ra || !curso) {
      setErro("Selecione um aluno e uma disciplina.");
      return;
    }
    const r = adicionarMatricula({ student_ra: Number(ra), course_id: Number(curso) });
    if (!r.ok) {
      setErro(r.erro);
      return;
    }
    router.push("/matriculas");
  }

  return (
    <div className="container area" data-area="matriculas">
      <h1>Nova matrícula</h1>
      <form onSubmit={enviar} className="form" noValidate>
        <label>
          Aluno
          <select value={ra} onChange={(e) => setRa(e.target.value)}>
            <option value="">Selecione um aluno</option>
            {alunos.map((a) => (
              <option key={a.ra} value={a.ra}>
                {a.ra} – {a.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Disciplina
          <select value={curso} onChange={(e) => setCurso(e.target.value)}>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        {erro && (
          <p className="erro" role="alert">
            {erro}
          </p>
        )}
        <div className="acoes">
          <button type="submit" className="btn">
            Cadastrar
          </button>
          <Link href="/matriculas" className="link-voltar">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}