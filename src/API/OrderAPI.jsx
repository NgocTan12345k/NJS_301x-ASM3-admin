import axiosClient from "./axiosClient";

const OrderAPI = {
  getAllOrder: () => {
    const url = "/order/getAllOrders";
    return axiosClient.get(url);
  },
};

export default OrderAPI;
