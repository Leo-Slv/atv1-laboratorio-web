import SideMenu from "@/components/SideMenu";

export default function AlunosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="area" data-area="alunos">
      <div className="alunos-layout">
        <SideMenu />
        <section className="alunos-conteudo">{children}</section>
      </div>
    </div>
  );
}