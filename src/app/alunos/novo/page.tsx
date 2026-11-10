"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function NovoAlunoPage() {
  const { adicionarAluno } = useData();
  const router = useRouter();
  const [ra, setRa] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const raNum = Number(ra.trim());
    if (!/^\d+$/.test(ra.trim()) || !Number.isSafeInteger(raNum) || raNum <= 0) {
      setErro("Informe um RA numérico válido.");
      return;
    }
    if (nome.trim().length === 0) {
      setErro("Informe o nome completo do aluno.");
      return;
    }
    const r = adicionarAluno({ ra: raNum, name: nome.trim().replace(/\s+/g, " ") });
    if (!r.ok) {
      setErro(r.erro);
      return;
    }
    router.push("/alunos");
  }

  return (
    <>
      <h1>Cadastrar aluno</h1>
      <form onSubmit={enviar} className="form" noValidate>
        <label>
          RA
          <input value={ra} onChange={(e) => setRa(e.target.value)} inputMode="numeric" />
        </label>
        <label>
          Nome completo
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
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
          <Link href="/alunos" className="link-voltar">
            Voltar
          </Link>
        </div>
      </form>
    </>
  );
}