import { ReactNode } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { ConfigWarning, Loading } from "@/components/common/states";

const TITLES: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard", description: "Your decision centre" },
  "/careers": { title: "Career Explorer", description: "Search and filter vocational pathways" },
  "/career-dna": { title: "Career DNA", description: "Build your structured decision profile" },
  "/preferences": { title: "Preferences", description: "Set the constraints that shape your options" },
  "/recommendations": { title: "Recommendations", description: "Explainable pathway matches" },
  "/family-decision": { title: "Family Decision", description: "Compare perspectives, understand trade-offs" },
  "/affordability": { title: "Affordability", description: "Costs, funding and honest gaps" },
  "/roadmap": { title: "Roadmap", description: "Your milestones from pathway to action" },
  "/profile": { title: "Profile", description: "Your account and Career DNA summary" },
  "/settings": { title: "Settings", description: "Account, security and preferences" },
};

export function AppLayout() {
  const { session, loading, configured } = useAuth();
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);

  if (!configured) {
    return (
      <div className="max-w-2xl mx-auto p-10">
        <ConfigWarning />
        <p className="mt-4 text-sm text-slate-600">
          <Link className="text-saffron-600 underline" to="/">Return to landing page</Link>
        </p>
      </div>
    );
  }
  if (loading) return <Loading label="Restoring session..." />;
  if (!session) return <Navigate to="/login" replace />;

  const meta = TITLES[location.pathname] ?? { title: "CareerSathi", description: "" };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 lg:block">
        <Sidebar />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <Sidebar onNavigate={() => setDrawer(false)} short />
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-4 lg:px-8">
            <button className="lg:hidden rounded-md p-2 hover:bg-slate-100" aria-label="Open menu" onClick={() => setDrawer(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <img src="/logo-short.png" alt="Career Sathi" className="h-8 w-auto lg:hidden" />
            <div>
              <h1 className="text-lg font-semibold text-navy">{meta.title}</h1>
              <p className="text-sm text-slate-500">{meta.description}</p>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
