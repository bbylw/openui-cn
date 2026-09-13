import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "openui-cn-theme";

/** 主题模式通过 context 下发，避免多处 useState 各持一份状态后互相脱节。 */
export const ThemeModeContext = createContext<ThemeMode>("dark");

export function useThemeModeValue(): ThemeMode {
  return useContext(ThemeModeContext);
}

function current(): ThemeMode {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** 站点主题，写入 <html data-theme> 与 localStorage；OpenUI 的 ThemeProvider 跟随同一个值。 */
export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(current);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { mode, setMode, toggle };
}
