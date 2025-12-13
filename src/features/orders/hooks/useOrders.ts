import { useEffect, useState } from "react";
import { orderService } from "../../../core/services/order.service";

export const useOrders = () => {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    orderService.getAll().then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return { orders, loading };
};
