import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { CareerSathiLogo } from "../components/common/Logo";
import { ConfigWarning } from "../components/common/states";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabaseConfigured) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/dashboard");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[360px_1fr]">
      <div className="hidden bg-sand p-8 text-navy lg:flex lg:flex-col lg:justify-center lg:gap-8">
        <CareerSathiLogo />
        <div>
          <h1 className="text-3xl font-bold">Make your next career decision with clarity.</h1>
          <p className="mt-3 text-slate-600">Profile | Match | Compare | Roadmap. Structured, explainable, and built for vocational pathways.</p>
        </div>
        <p className="text-xs text-slate-500">CareerSathi | Decision support for vocational education</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
          <div className="lg:hidden"><CareerSathiLogo /></div>
          <h2 className="text-2xl font-bold text-navy">Welcome back</h2>
          {!supabaseConfigured && <ConfigWarning />}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <label className="block text-sm font-medium">Email
            <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">Password
            <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button disabled={loading} className="w-full rounded-md bg-saffron py-2.5 font-semibold text-white hover:bg-saffron-600 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-sm text-slate-600">No account? <Link className="text-saffron-600 underline" to="/register">Create one</Link></p>
        </form>
      </div>
    </div>
  );
}
