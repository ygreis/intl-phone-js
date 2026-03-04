const STORAGE_KEY = "intl-phone-js-theme";
const THEME_ATTRIBUTE = "data-theme";

function getSystemTheme() {
  if (typeof window.matchMedia !== "function") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  const value = localStorage.getItem(STORAGE_KEY);
  if (value === "dark" || value === "light") {
    return value;
  }
  return null;
}

export function getActiveTheme() {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE) || "dark";
}

export function setTheme(theme, persist = true) {
  const normalized = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute(THEME_ATTRIBUTE, normalized);

  if (persist) {
    localStorage.setItem(STORAGE_KEY, normalized);
  }

  return normalized;
}

export function initTheme() {
  const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  if (current === "dark" || current === "light") {
    return current;
  }

  const stored = getStoredTheme();
  if (stored) {
    return setTheme(stored, false);
  }

  return setTheme(getSystemTheme(), false);
}

export function clearThemePreference() {
  localStorage.removeItem(STORAGE_KEY);
  return setTheme(getSystemTheme(), false);
}

export function toggleTheme() {
  const current = getActiveTheme();
  return setTheme(current === "dark" ? "light" : "dark");
}
