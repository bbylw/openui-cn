import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@openuidev/react-ui";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useThemeMode } from "@/lib/theme";
import BenchmarksPage from "@/pages/BenchmarksPage";
import HomePage from "@/pages/HomePage";
import LangPage from "@/pages/LangPage";
import PackagesPage from "@/pages/PackagesPage";
import QuickstartPage from "@/pages/QuickstartPage";

function Rail() {
  return (
    <div className="rail" aria-hidden="true">
      <div className="rail__track">
        <span className="rail__fill" />
        <span className="rail__tick" />
        <span className="rail__tick rail__tick--mid" />
      </div>
    </div>
  );
}

export default function App() {
  const { mode, toggle } = useThemeMode();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <ThemeProvider mode={mode}>
      <div className="shell">
        <Rail />
        <SiteHeader mode={mode} onToggleTheme={toggle} />
        <main className="main">
          <div className="page" key={pathname}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lang" element={<LangPage />} />
              <Route path="/quickstart" element={<QuickstartPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/benchmarks" element={<BenchmarksPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
