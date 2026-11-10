import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { DataProvider } from "@/context/DataContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestão Acadêmica",
  description: "Consulta e cadastro de alunos, disciplinas e matrículas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <DataProvider>
          <header className="header">
            <Link href="/" className="logo">
              Gestão Acadêmica
            </Link>
            <Nav />
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            Laboratório de Desenvolvimento Web &middot; Atividade 1 &ndash; Rotas e navegação no Next.js
          </footer>
        </DataProvider>
      </body>
    </html>
  );
}