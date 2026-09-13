import { NavLink } from "react-router-dom";
import { NAV, SITE } from "@/content/site";
import type { ThemeMode } from "@/lib/theme";

type Props = {
  mode: ThemeMode;
  onToggleTheme: () => void;
};

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.4A8.4 8.4 0 1 1 9.6 4a6.9 6.9 0 0 0 10.4 10.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.4 4.6h5.2M3.4 4.6v5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.6 15.4h-5.2M16.6 15.4v-5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M4 16 16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader({ mode, onToggleTheme }: Props) {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <a className="brand" href={SITE.docs} target="_blank" rel="noreferrer">
          <span className="brand__mark">
            <MarkIcon />
          </span>
          <span className="brand__name">
            OpenUI<span> 中文站</span>
          </span>
        </a>

        <nav className="nav" aria-label="主导航">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : undefined}
              className={({ isActive }) => `nav__link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar__actions">
          <a
            className="iconbtn"
            href={SITE.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
            title="GitHub 仓库"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.19c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
            </svg>
          </a>
          <button
            type="button"
            className="iconbtn"
            onClick={onToggleTheme}
            aria-label={mode === "dark" ? "切换到浅色" : "切换到深色"}
            title={mode === "dark" ? "切换到浅色" : "切换到深色"}
          >
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
