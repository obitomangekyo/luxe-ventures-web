import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const THEME_STORAGE_KEY = "luxe-ventures-theme";
export type Theme = "luxury" | "summer";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function parseTheme(value: string | null): Theme | null {
  return value === "summer" || value === "luxury" ? value : null;
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "luxury";

  const urlTheme = parseTheme(new URLSearchParams(window.location.search).get("theme"));
  if (urlTheme) return urlTheme;

  try {
    return parseTheme(window.localStorage.getItem(THEME_STORAGE_KEY)) ?? "luxury";
  } catch {
    return "luxury";
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function persistTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme selection still works when browser storage is unavailable.
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Keep the first client render identical to SSR. Resolve browser preferences
  // in the effect below so themed images and text cannot diverge during hydration.
  const [theme, setThemeState] = useState<Theme>("luxury");

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    persistTheme(preferredTheme);
    setThemeState(preferredTheme);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    setThemeState(nextTheme);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "luxury" ? "summer" : "luxury"),
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export const themeInitScript = `
(function () {
  try {
    var queryTheme = new URLSearchParams(window.location.search).get('theme');
    var saved = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = queryTheme === 'summer' || queryTheme === 'luxury'
      ? queryTheme
      : saved === 'summer' || saved === 'luxury'
        ? saved
        : 'luxury';
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = 'luxury';
  }
})();`;
