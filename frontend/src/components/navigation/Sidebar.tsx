import { NavLink } from "react-router-dom";
import { LayoutDashboard, Compass, Dna, SlidersHorizontal, Lightbulb, Users, Wallet, Map, User, Settings, LogOut } from "lucide-react";
import { CareerSathiLogo } from "../common/Logo";
import { useAuth } from "@/hooks/useAuth";

const SECTIONS: Array<{ label: string; items: Array<{ to: string; label: string; icon: React.ElementType }> }> = [
  { label: "Overview", items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] },
  {
    label: "Explore",
    items: [
      { to: "/careers", label: "Career Explorer", icon: Compass },
      { to: "/career-dna", label: "Career DNA", icon: Dna },
      { to: "/preferences", label: "Preferences", icon: SlidersHorizontal },
    ],
  },
  {
    label: "Decide",
    items: [
      { to: "/recommendations", label: "Recommendations", icon: Lightbulb },
      { to: "/family-decision", label: "Family Decision", icon: Users },
      { to: "/affordability", label: "Affordability", icon: Wallet },
    ],
  },
  { label: "Plan", items: [{ to: "/roadmap", label: "Roadmap", icon: Map }] },
  {
    label: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: User },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar({ onNavigate, short = false }: { onNavigate?: () => void; short?: boolean }) {
  const { signOut, session } = useAuth();
  const meta = (session?.user?.user_metadata ?? {}) as Record<string, unknown>;
  return (
    <div className="flex h-full flex-col bg-white text-slate-700 border-r border-slate-200">
      <div className="px-5 py-5 border-b border-slate-200">
        <CareerSathiLogo short={short} />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {SECTIONS.map((sec) => (
          <div key={sec.label}>
            <div className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">{sec.label}</div>
            {sec.items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm ${
                    isActive ? "bg-slate-100 text-navy border-l-2 border-saffron" : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <Icon className="h-4 w-4" /> {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-saffron/20 text-saffron font-semibold">
            {(typeof meta.full_name === "string" ? meta.full_name : session?.user?.email ?? "?").slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-navy">{(meta.full_name as string) ?? session?.user?.email}</div>
            <div className="text-xs text-slate-400">{(meta.role as string) ?? "Student"}</div>
          </div>
          <button
            aria-label="Logout"
            onClick={() => signOut()}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-navy"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
