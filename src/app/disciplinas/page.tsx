import { disciplinas } from "@/data/disciplinas";

export default function DisciplinasPage() {
  return (
    <div className="container area" data-area="disciplinas">
      <h1>Disciplinas</h1>
      <p className="total">
        Total de disciplinas: <strong>{disciplinas.length}</strong>
      </p>
      <div className="cards">
        {disciplinas.map((d) => (
          <article key={d.id} className="card">
            <span className="card-id">ID {d.id}</span>
            <h2>{d.name}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}