// App.jsx
import { useState, lazy, Suspense } from "react";
import { Layout } from "./components/layout/Layout";
import { AuthScreen } from "./components/auth/AuthScreen";

// Lazy load tabs for better performance
const ScheduleTab = lazy(() => import("./components/schedule/ScheduleTab"));
const ClientsTab = lazy(() => import("./components/clients/ClientsTab"));
const EmployeesTab = lazy(() => import("./components/employees/EmployeesTab"));
const NewsTab = lazy(() => import("./components/news/NewsTab"));
const PromosTab = lazy(() => import("./components/promos/PromosTab"));

import "./style.css";

export default function App() {
  const [auth, setAuth] = useState(() => {
    try {
      const s = localStorage.getItem("fh_auth");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });
  const [phone, setPhone] = useState(() => localStorage.getItem("fh_phone") || "");
  const [tab, setTab] = useState("schedule");

  const handleAuth = (d, p) => {
    setAuth(d);
    setPhone(p);
    try {
      localStorage.setItem("fh_auth", JSON.stringify(d));
      localStorage.setItem("fh_phone", p);
    } catch {}
  };

  const handleLogout = () => {
    setAuth(null);
    setPhone("");
    setTab("schedule");
    try {
      localStorage.removeItem("fh_auth");
      localStorage.removeItem("fh_phone");
    } catch {}
  };

  if (!auth) return <AuthScreen onAuth={handleAuth} />;

  const tabs = {
    schedule: <ScheduleTab token={auth.accessToken} />,
    clients: <ClientsTab />,
    employees: <EmployeesTab />,
    news: <NewsTab />,
    promos: <PromosTab />,
  };

  return (
    <Layout tab={tab} onTab={setTab} phone={phone} onLogout={handleLogout}>
      <Suspense fallback={<div className="flex-center" style={{ height: "100vh", color: "var(--sub)" }}>Загрузка...</div>}>
        {tabs[tab]}
      </Suspense>
    </Layout>
  );
}