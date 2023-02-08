import React, { useEffect, useState } from "react";
import queryString from "query-string";
import MessengerAPI from "../API/MessengerAPI";
import "./Chat.css";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import UserAPI from "../API/UserAPI";

import io from "socket.io-client";
const socket = io(
  "http://localhost:3500",

  { transports: ["websocket"] }
);

function Chat(props) {
  const [allMessenger, setAllMessenger] = useState([]);

  const id_counselor = "63cebfeb9da5ee68f0215dfe";

  const [id_user, set_id_user] = useState("");

  const [message, setMessage] = useState([]);

  const [load, setLoad] = useState(false);

  const [textMessage, setTextMessage] = useState("");

  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };

  // Hàm này dùng để hiển thị roomId
  useEffect(() => {
    const getAllMessenger = async () => {
      try {
        const response = await MessengerAPI.getAllMessage();
        setAllMessenger(response);
      } catch (error) {
        console.log(error);
      }
      // const res = await axios.get(
      //   "http://localhost:3500/api/messenger/getAllMessenger"
      // );

      // const data = res && res.data ? res.data : [];

      // setAllMessenger(data);
    };
    getAllMessenger();
  }, []);

  const AllRoomId = allMessenger.map((item) => {
    return item.roomId;
  });
  const AllRoomIdUnique = Array.from(new Set(AllRoomId));

  // Hàm này dùng để lấy id_user
  const handleRoomIdDetail = (value) => {
    const getId_userByRoomId = async () => {
      try {
        const response = await UserAPI.getIdUserByRoomId(value);
        console.log("res-->", response);
        set_id_user(response);
      } catch (error) {
        console.log(error);
      }
      // const res = await axios.get(`http://localhost:3500/api/users/${value}`);
      // const data = res && res.data ? res.data : [];
      // set_id_user(data);
    };
    getId_userByRoomId();
  };

  // Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
  // Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
  // để gọi lại hàm này
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        id_counselor: id_counselor,
        id_user: id_user,
      };

      const query = "?" + queryString.stringify(params);

      const response = await MessengerAPI.getMessage(query);
      console.log("res1-->", response);
      setMessage(response.content);
    };

    fetchData();
  }, [id_user]);

  // Đây là hàm lấy dữ liệu từ api dựa vào state load
  // Dùng để load lại tin nhắn khi có socket từ server gửi tới
  useEffect(() => {
    if (load) {
      const fetchData = async () => {
        const params = {
          id_counselor: id_counselor,
          id_user: id_user,
        };

        const query = "?" + queryString.stringify(params);

        const response = await MessengerAPI.getMessage(query);
        console.log("res2-->", response);

        setMessage(response.content);
      };

      fetchData();

      setLoad(false);
    }
  }, [id_user, load]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoad(true);
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = () => {
    // console.log(textMessage);

    //Khi gửi tin nhắn thì nó sẽ lấy id của cả 2 người
    //Với cái key category có value là send
    //Vì là gửi tin nhắn
    const data = {
      id_counselor: id_counselor,
      id_user: id_user,
      message: textMessage,
      name: sessionStorage.getItem("name_user"),
      category: "send",
    };

    //Sau đó nó emit dữ liệu lên server bằng socket với key send_message và value data
    socket.emit("send_message", data);

    //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
    const postData = async () => {
      const query = "?" + queryString.stringify(data);

      const response = await MessengerAPI.postMessage(query);

      console.log("response-->", response);

      //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
      setLoad(true);
    };

    postData();

    setTextMessage("");
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                Chat
              </h4>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 p-0">
                    <li
                      className="breadcrumb-item text-muted active"
                      aria-current="page"
                    >
                      Apps
                    </li>
                    <li
                      className="breadcrumb-item text-muted"
                      aria-current="page"
                    >
                      Chat
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-lg-3 col-xl-2 border-right">
                    <div className="card-body border-bottom">
                      <form>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search Contact"
                        />
                      </form>
                    </div>
                    <div
                      className="scrollable position-relative"
                      style={{ height: "calc(100vh - 111px)" }}
                    >
                      <ul className="mailbox list-style-none">
                        <li>
                          <div className="message-center">
                            {AllRoomIdUnique &&
                              AllRoomIdUnique.length > 0 &&
                              AllRoomIdUnique.map((value, index) => (
                                <a
                                  key={index + 1}
                                  onClick={() => handleRoomIdDetail(value)}
                                  className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                                >
                                  <div className="w-75 d-inline-block v-middle pl-2">
                                    <h6 className="message-title mb-0 mt-1">
                                      {value}
                                    </h6>
                                    <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                      Online
                                    </span>
                                    <span className="font-12 text-nowrap d-block text-muted"></span>
                                  </div>
                                </a>
                              ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-9  col-xl-10">
                    <div
                      className="chat-box scrollable position-relative"
                      style={{ height: "calc(100vh - 111px)" }}
                    >
                      <ul className="chat-list list-style-none px-3 pt-3">
                        {message &&
                          message.map((value) =>
                            value.category === "send" ? (
                              <li
                                className="chat-item odd list-style-none mt-3"
                                key={value.id}
                              >
                                <div className="chat-content text-right d-inline-block pl-3">
                                  <div className="box msg p-2 d-inline-block mb-1">
                                    You: {value.message}
                                  </div>
                                  <br />
                                </div>
                              </li>
                            ) : (
                              <li
                                className="chat-item list-style-none mt-3"
                                key={value.id}
                              >
                                <div className="chat-img d-inline-block">
                                  <img
                                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                    alt="user"
                                    className="rounded-circle"
                                    width="45"
                                  />
                                </div>
                                <div className="chat-content d-inline-block pl-3">
                                  <h6 className="font-weight-medium">
                                    {value.name}
                                  </h6>
                                  <div className="msg p-2 d-inline-block mb-1">
                                    Client: {value.message}
                                  </div>
                                </div>
                                <div className="chat-time d-block font-10 mt-1 mr-0 mb-3"></div>
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                    <div className="card-body border-top">
                      <div className="row">
                        <div className="col-9">
                          <div className="input-field mt-0 mb-0">
                            <input
                              id="textarea1"
                              placeholder="Type and enter"
                              className="form-control border-0"
                              type="text"
                              onChange={onChangeText}
                              value={textMessage}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <button
                            className="btn-circle btn-lg btn-cyan float-right text-white"
                            onClick={handlerSend}
                          >
                            <i className="fas fa-paper-plane"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
