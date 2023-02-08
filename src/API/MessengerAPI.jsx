import axiosClient from "./axiosClient";

const MessengerAPI = {
  getMessage: (query) => {
    const url = `/messenger/${query}`;
    return axiosClient.get(url);
  },

  postMessage: (query) => {
    const url = `/messenger/send${query}`;
    return axiosClient.post(url);
  },

  getAllMessage: () => {
    const url = "/messenger/getAllMessenger";
    return axiosClient.get(url);
  },
};

export default MessengerAPI;
