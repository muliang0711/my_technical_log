import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer-brand">
              <span className="logo">K</span>
              <span>Knowledge Log</span>
            </div>
            <p>
              A technical archive for software development, infrastructure,
              system design, and debugging notes.
            </p>
          </div>
          <div>
            <h3>Navigate</h3>
            <nav className="footer-nav" aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
          <div>
            <h3>Connect</h3>
            <div className="socials">
              <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" aria-label="GitHub"><Github size={16} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="#" aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>
        </div>
        <div className="copyright">© 2026 Knowledge Log. All rights reserved.</div>
      </div>
    </footer>
  );
}
