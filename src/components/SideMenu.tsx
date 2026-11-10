"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const itens = [
  { href: "/alunos", label: "Lista de alunos", exato: false },
  { href: "/alunos/novo", label: "Cadastrar aluno", exato: true },
];

export default function SideMenu() {
  const pathname = usePathname();
  const ativoLista = (href: string) =>
    href === "/alunos"
      ? pathname === "/alunos" || (pathname.startsWith("/alunos/") && pathname !== "/alunos/novo")
      : pathname === href;
  return (
    <aside className="side-menu" aria-label="Menu de alunos">
      <h2>Alunos</h2>
      <ul>
        {itens.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className={ativoLista(i.href) ? "ativo" : undefined}>
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}