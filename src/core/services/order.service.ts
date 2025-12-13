import { get } from "../api/axiosHttpClient";


export const orderService = {
  getAll: async () => {
    const response = await get("/orders");
    return response.data;
  }
};
