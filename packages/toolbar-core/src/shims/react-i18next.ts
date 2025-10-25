// Minimal stub til vi setter opp ekte i18n senere
export const useTranslation = () => ({
  t: (k: string, _opts?: any) => k,  // returnerer nøkkelen som tekst
  i18n: { language: "nb" },
});
export default { useTranslation };
