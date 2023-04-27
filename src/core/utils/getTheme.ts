export type Theme = "light" | "dark";

export const getTheme = (): Theme => {
  const currentTheme = localStorage.getItem("theme");
  return currentTheme === "light" || currentTheme === "dark"
    ? currentTheme
    : "light";
};
