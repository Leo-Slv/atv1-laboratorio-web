import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Bem-vindo ao sistema de Gestão Acadêmica</h1>
      <p className="lead">
        Este sistema permite consultar e cadastrar alunos e matrículas, além de consultar as
        disciplinas do curso.
      </p>
      <div className="home-grid">
        <Link href="/alunos" className="home-card" data-area="alunos">
          <h2>Alunos</h2>
          <p>Consulte os alunos cadastrados e cadastre novos.</p>
        </Link>
        <Link href="/disciplinas" className="home-card" data-area="disciplinas">
          <h2>Disciplinas</h2>
          <p>Veja o catálogo de disciplinas do curso.</p>
        </Link>
        <Link href="/matriculas" className="home-card" data-area="matriculas">
          <h2>Matrículas</h2>
          <p>Consulte e registre as matrículas dos alunos.</p>
        </Link>
      </div>
    </div>
  );
}