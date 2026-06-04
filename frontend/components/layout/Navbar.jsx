"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun } from "lucide-react";

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
        <div className="header-tools">
          <label className="search-wrap">
            <span className="sr-only">Search</span>
            <Search size={18} />
            <input className="search" placeholder="Search..." />
          </label>
          <span className="icon-button" title="Theme">
            <Sun size={18} />
          </span>
        </div>
      </div>
    </header>
  );
}
