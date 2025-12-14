import React, { createContext, useContext, useEffect } from "react";
import JJfisk from "./tenants/JJfisk";
import Default from "./tenants/Default";
import type { TenantConfig } from "./types";


export const getConfig = (): TenantConfig => {
  const host = window.location.hostname;

  if (host.includes("localhost")) return JJfisk;

  return Default;
};

const ConfigContext = createContext<{ config: TenantConfig }>({ config: getConfig() });

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = getConfig();

  // 🔥 Apply tenant theme
  useEffect(() => {
    const theme = config.theme;
    const root = document.documentElement;

    root.style.setProperty("--primary-background-color", theme.primaryBackGroundColor);
    root.style.setProperty("--secondary-background-color", theme.secondaryBackgroundColor ?? theme.primaryBackGroundColor);

    root.style.setProperty("--third-background-color", theme.thirdGreyBackgroundColor ?? theme.thirdGreyBackgroundColor);

     root.style.setProperty("--addto-basket-color", theme.addToBasketHoverColor ?? theme.addToBasketHoverColor);
    

    

    root.style.setProperty("--primary-text-color", theme.primaryTextColor);
    root.style.setProperty("--secondary-text-color", theme.secondaryTextColor ?? theme.primaryTextColor);

    root.style.setProperty("--hover-menuactions-color", theme.hoverMenuActions ?? theme.hoverMenuActions);


  }, [config]);

  return <ConfigContext.Provider value={{ config }}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
export const config = getConfig();
export default config;
