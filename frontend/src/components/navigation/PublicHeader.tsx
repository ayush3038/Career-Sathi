import { Link } from "react-router-dom";
import { CareerSathiLogo } from "../common/Logo";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <CareerSathiLogo compact />
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#how" className="hover:text-navy">How It Works</a>
          <a href="#capabilities" className="hover:text-navy">Features</a>
          <a href="#journey" className="hover:text-navy">Decision Journey</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-navy">Login</Link>
          <Link to="/register" className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-white hover:bg-saffron-600">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
        {"CareerSathi | AI-powered career counselling and family decision-support for vocational education."}
      </div>
    </footer>
  );
}
