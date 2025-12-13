import React from "react";
import  type { ReactNode } from "react";

import companyATheme from "./tenants/companyA.theme";

const themes: Record<string, any> = {
  companyA: companyATheme
};

export const ThemeContext = React.createContext(themes.companyA);

export const ThemeProvider = ({ children, themeName = "companyA" }: { children: ReactNode; themeName?: string }) => {
  const theme = themes[themeName] || themes.companyA;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
