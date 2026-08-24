// components/layout/Layout.jsx
import { useState, useEffect } from "react";
import { useWidth } from "../../hooks/useWidth";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { BottomNav } from "./BottomNav";

export function Layout({ tab, onTab, phone, onLogout, theme, onThemeToggle, children }) {
  const width = useWidth();
  const [drawer, setDrawer] = useState(false);
  const isDesktop = width >= 1024;
  const isMobile = width < 640;

  useEffect(() => setDrawer(false), [tab]);

  // Применяем тему
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme || "dark");
  }, [theme]);

  if (isDesktop) {
    return (
      <div className="app-layout app-layout--desktop">
        <Sidebar 
          tab={tab} 
          onTab={onTab} 
          phone={phone} 
          onLogout={onLogout}
          theme={theme}
          onThemeToggle={onThemeToggle}
        />
        <main className="main-content">{children}</main>
      </div>
    );
  }

  return (
    <div className="app-layout app-layout--mobile">
      <MobileHeader onMenu={() => setDrawer(true)} tab={tab} />
      
      {drawer && (
        <>
          <div className="drawer-overlay" onClick={() => setDrawer(false)} />
          <div className="drawer">
            <Sidebar
              tab={tab}
              onTab={(t) => { onTab(t); setDrawer(false); }}
              phone={phone}
              onLogout={() => { onLogout(); setDrawer(false); }}
              theme={theme}
              onThemeToggle={onThemeToggle}
            />
          </div>
        </>
      )}

      <main className={`main-content ${isMobile ? "main-content--with-bottom-nav" : ""}`}>
        {children}
      </main>
      
      {isMobile && <BottomNav tab={tab} onTab={onTab} />}
    </div>
  );
}