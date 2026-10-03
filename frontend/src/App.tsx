import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AppLayout } from "@/layouts/AppLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import CareerDNA from "@/pages/CareerDNA";
import Preferences from "@/pages/Preferences";
import Careers from "@/pages/Careers";
import Recommendations from "@/pages/Recommendations";
import RoadmapPage from "@/pages/Roadmap";
import FamilyDecision from "@/pages/FamilyDecision";
import Affordability from "@/pages/Affordability";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/career-dna" element={<CareerDNA />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/family-decision" element={<FamilyDecision />} />
          <Route path="/affordability" element={<Affordability />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
