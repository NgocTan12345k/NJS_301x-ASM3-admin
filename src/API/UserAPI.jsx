import axiosClient from "./axiosClient";

const UserAPI = {
  getIdUserByRoomId: (value) => {
    const url = `/users/${value}`;
    return axiosClient.get(url);
  },

  getAllUser: () => {
    const url = "/users";
    return axiosClient.get(url);
  },
};

export default UserAPI;
