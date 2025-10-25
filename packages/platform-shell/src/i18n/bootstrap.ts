import i18next from "i18next";

// Minimal init — kan utvides senere
if (!i18next.isInitialized) {
  i18next.init({
    lng: "nb",
    fallbackLng: "en",
    resources: {}, // ToolbarCore kan registrere egne bundles ved mount
    interpolation: { escapeValue: false },
  });
}
