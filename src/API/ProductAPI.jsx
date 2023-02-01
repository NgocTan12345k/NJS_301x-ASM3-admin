import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/api/product/getAllProducts";
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/api/product/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
