
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "../theme";
import { ConfigProvider } from "../config";
import { UserProvider } from "../store/user/CurrentUserContext";
import { CartProvider } from "../store/cart/CartProvider";
import { DashboardProvider } from "../store/dashboard/DashboardProvider";

type Props = { children: ReactNode };

export const AppProviders = ({ children }: Props) => {
  return (
    <ConfigProvider>
      <InnerProviders>{children}</InnerProviders>
    </ConfigProvider>
  );
};

const InnerProviders = ({ children }: Props) => {
  // const { config } = useConfig();

  return (
    // <ThemeProvider themeName={config.theme}>
      <BrowserRouter>
        <UserProvider>
          <DashboardProvider>
            <CartProvider>{children}</CartProvider>
          </DashboardProvider>
        </UserProvider>
      </BrowserRouter>
    // </ThemeProvider>
  );
};
