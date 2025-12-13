import { useOrders } from "../hooks/useOrders";

const OrderList = () => {
  const { orders, loading } = useOrders();

  if (loading) return <div>Loading...</div>;
  if (!orders) return <div>No orders</div>;

  return <pre>{JSON.stringify(orders, null, 2)}</pre>;
};

export default OrderList;
