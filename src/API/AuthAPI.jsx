import axiosClient from "./axiosClient";

const AuthAPI = {
  postSignIn: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
};

export default AuthAPI;
