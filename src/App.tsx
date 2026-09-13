import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { applyRouteMeta } from "@/lib/meta";
import { ThemeModeContext, useThemeMode } from "@/lib/theme";
import BenchmarksPage from "@/pages/BenchmarksPage";
import CommunityPage from "@/pages/CommunityPage";
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
    applyRouteMeta(pathname);
  }, [pathname]);

  return (
    <ThemeModeContext.Provider value={mode}>
      <div className="shell">
        <a className="skip" href="#main">
          跳到主内容
        </a>
        <Rail />
        <SiteHeader mode={mode} onToggleTheme={toggle} />
        <main className="main" id="main">
          <div className="page" key={pathname}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lang" element={<LangPage />} />
              <Route path="/quickstart" element={<QuickstartPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/benchmarks" element={<BenchmarksPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        <SiteFooter />
      </div>
    </ThemeModeContext.Provider>
  );
}
