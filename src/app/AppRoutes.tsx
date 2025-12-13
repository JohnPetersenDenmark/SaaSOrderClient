import { Routes, Route } from "react-router-dom";
import OrdersPage from "../features/orders/pages/OrdersPage";
import CreateOrder from "../pages/CreateOrder";
import HomePage from "../pages/HomePage";
import { config } from "../config";
import { CartProvider } from "../components/CartContext";

const AppRoutes = () => {
  const { features } = config;

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        {features.orders && <Route path="/orders" element={<OrdersPage />} />}
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;