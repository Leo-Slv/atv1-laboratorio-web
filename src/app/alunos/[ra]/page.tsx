import AlunoDetalhe from "@/components/AlunoDetalhe";

export default async function AlunoPage({ params }: { params: Promise<{ ra: string }> }) {
  const { ra } = await params;
  return <AlunoDetalhe ra={ra} />;
}