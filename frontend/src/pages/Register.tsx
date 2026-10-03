import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { CareerSathiLogo } from "../components/common/Logo";
import { ConfigWarning } from "../components/common/states";

const ROLES = [
  { id: "Student", desc: "Exploring vocational pathways and planning my career." },
  { id: "Parent", desc: "Supporting a learner's career decision." },
  { id: "Counsellor", desc: "Guiding students and families through pathways." },
];

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!supabaseConfigured) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, role } } });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/career-dna");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[360px_1fr]">
      <div className="hidden bg-sand p-8 text-navy lg:flex lg:flex-col lg:justify-center lg:gap-8">
        <CareerSathiLogo />
        <div>
          <h1 className="text-3xl font-bold">Start with clarity.</h1>
          <p className="mt-3 text-slate-600">Create your account, then complete a short guided profile - no 40-question questionnaire at signup.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
          <div className="lg:hidden"><CareerSathiLogo /></div>
          <h2 className="text-2xl font-bold text-navy">Create your account</h2>
          {!supabaseConfigured && <ConfigWarning />}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <label className="block text-sm font-medium">Full Name
            <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">Email
            <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">Password
            <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label className="block text-sm font-medium">Confirm Password
            <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </label>
          <fieldset>
            <legend className="text-sm font-medium">I am a...</legend>
            <div className="mt-2 grid gap-2">
              {ROLES.map((r) => (
                <label key={r.id} className={`flex cursor-pointer gap-3 rounded-md border p-3 text-sm ${role === r.id ? "border-saffron bg-orange-50" : "border-slate-200"}`}>
                  <input type="radio" name="role" className="mt-1" checked={role === r.id} onChange={() => setRole(r.id)} />
                  <span><span className="font-semibold text-navy">{r.id}</span> - {r.desc}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button disabled={loading} className="w-full rounded-md bg-saffron py-2.5 font-semibold text-white hover:bg-saffron-600 disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>
          <p className="text-sm text-slate-600">Already have an account? <Link className="text-saffron-600 underline" to="/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}
