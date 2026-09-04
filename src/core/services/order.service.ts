import { get } from "../api/axiosHttpClient";


export const orderService = {
  getAll: async () => {
    const response : any = await get("/orders");
    return response.data;
  }
};
