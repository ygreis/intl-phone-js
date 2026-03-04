(function () {
  var storageKey = "intl-phone-js-theme";
  var stored = localStorage.getItem(storageKey);
  var hasSystemSupport = typeof window.matchMedia === "function";
  var systemTheme = hasSystemSupport && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  var resolvedTheme;
  if (stored === "light" || stored === "dark") {
    resolvedTheme = stored;
  } else if (hasSystemSupport) {
    resolvedTheme = systemTheme;
  } else {
    resolvedTheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", resolvedTheme);
})();
