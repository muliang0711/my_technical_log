"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link className={active ? "active" : undefined} href={href}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="header-left">
          <Link className="brand" href="/">
            <span className="logo">K</span>
            <span>Knowledge Log</span>
          </Link>
          <nav className="nav" aria-label="Primary navigation">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/series">Series</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
