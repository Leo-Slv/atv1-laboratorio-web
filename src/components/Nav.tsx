"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const itens = [
  { href: "/", label: "Início", area: "home" },
  { href: "/alunos", label: "Alunos", area: "alunos" },
  { href: "/disciplinas", label: "Disciplinas", area: "disciplinas" },
  { href: "/matriculas", label: "Matrículas", area: "matriculas" },
];

function ativo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navegação principal" className="nav">
      {itens.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          data-area={i.area}
          className={ativo(pathname, i.href) ? "nav-link ativo" : "nav-link"}
          aria-current={ativo(pathname, i.href) ? "page" : undefined}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}