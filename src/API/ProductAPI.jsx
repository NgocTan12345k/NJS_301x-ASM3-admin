import axiosClient from "./axiosClient";

const ProductAPI = {
  // getCategory: (query) => {
  //   const url = `/api/product/category${query}`;
  //   return axiosClient.get(url);
  // },
  // getPagination: (query) => {
  //   const url = `/products/pagination${query}`;
  //   return axiosClient.get(url);
  // },
  getAPI: () => {
    const url = "/product/getAllProducts";
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  getAllProduct: () => {
    const url = "/product/getAllProducts";
    return axiosClient.get(url);
  },
  deteleProduct: (col1) => {
    const url = `/product/delete/${col1}`;
    return axiosClient.delete(url);
  },
  postAddProduct: (formData) => {
    const url = "/product/postAddProduct";
    return axiosClient.post(url, formData);
  },
  updateProduct: (id, productDetail) => {
    const url = `/product/update/${id}`;
    return axiosClient.put(url, productDetail);
  },
};

export default ProductAPI;
