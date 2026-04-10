(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var toggle = document.querySelector("[data-theme-toggle]");
  var storageKey = "site-theme";
  var preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = localStorage.getItem(storageKey) || (preferredDark ? "dark" : "light");

  function iconFor(nextTheme) {
    if (nextTheme === "dark") {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"/></svg>';
    }

    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }

  function applyTheme(nextTheme) {
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem(storageKey, nextTheme);

    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to " + (nextTheme === "dark" ? "light" : "dark") + " mode");
      toggle.innerHTML = iconFor(nextTheme);
    }
  }

  applyTheme(theme);

  if (toggle) {
    toggle.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme(theme);
    });
  }

  var revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length === 0) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(function (element) {
      element.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach(function (element) {
    observer.observe(element);
  });
})();
