import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container centro">
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <Link href="/" className="btn btn-neutro">
        Voltar ao início
      </Link>
    </div>
  );
}