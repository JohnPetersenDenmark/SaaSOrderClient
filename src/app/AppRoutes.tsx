import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersPage from "../features/orders/pages/OrdersPage";
import CreateOrder from "../pages/CreateOrder";
import HomePage from "../pages/HomePage";
import { config } from "../config";
import { CartProvider } from "../components/CartContext";
import TopMenuAdmin from "../components/TopMenuAdmin";
import { CurrentUser } from "../components/CurrentUser";
import { DashboardProvider } from "../components/admin/DashboardContext";
import { ConfigProvider } from "../config";

const AppRoutes = () => {
  const { features } = config;

  return (
    <BrowserRouter>
    <ConfigProvider>
      <CurrentUser>
        <DashboardProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/createOrder" element={<CreateOrder />} />
              <Route path="/admin" element={<TopMenuAdmin />} />
              {features.orders && (
                <Route path="/orders" element={<OrdersPage />} />
              )}
            </Routes>
          </CartProvider>
        </DashboardProvider>
      </CurrentUser>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
