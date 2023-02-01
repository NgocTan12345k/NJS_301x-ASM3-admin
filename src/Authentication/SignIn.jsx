import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
// import UserAPI from '../API/UserAPI';
// import { addSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
// import queryString from "query-string";
// import CartAPI from "../API/CartAPI";
// import axios from "axios";
// import MessengerAPI from "../API/MessengerAPI";

function SignIn(props) {
  //listCart được lấy từ redux
  // const listCart = useSelector((state) => state.Cart.listCart);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // const [user, setUser] = useState([]);

  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorAuthorized, setErrorAuthorized] = useState(false);

  const [redirect, setRedirect] = useState(false);

  // const [checkPush, setCheckPush] = useState(false);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3500/api/auth/login")
  //     .then((resuilt) => {
  //       if (resuilt) {
  //         console.log("resuilt-->", resuilt);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // axios.defaults.withCredentials = true;

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    // const Signin = () => {
    //   fetch("http://localhost:3500/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "same-origin",
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log("data-->", data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // };
    // Signin();
    if (!email) {
      setErrorEmail(true);
      return;
    } else {
      if (!password) {
        setErrorEmail(false);
        setErrorPassword(true);
        return;
      } else {
        setErrorPassword(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          return;
        } else {
          setEmailRegex(false);
          const Signin = () => {
            fetch("http://localhost:3500/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "same-origin",
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            })
              .then((res) => {
                // console.log("res-->", res.clone().json());
                return res.clone().json();
              })
              .then((data) => {
                console.log("data-->", data);
                if (data.message === "Login successful") {
                  if (data.user.role === "client") {
                    setErrorAuthorized(true);
                    return;
                  } else {
                    localStorage.setItem("id_user", data.user.userId);
                    localStorage.setItem("name_user", data.user.userName);
                    localStorage.setItem("role", data.user.role);
                    setRedirect(true);
                  }

                  // const action = addSession(localStorage.getItem("id_user"));
                  // dispatch(action);
                  // setCheckPush(true);

                  // Hàm này dùng để tạo các conversation cho user và admin
                  // const postConversation = async () => {
                  //   console.log("email-->", email);
                  //   const params = {
                  //     email: email,
                  //     //   password: password,
                  //   };

                  //   const query = "?" + queryString.stringify(params);

                  //   const response = await MessengerAPI.postConversation(query);
                  //   console.log("response-->", response);
                  // };

                  // postConversation();
                } else if (data.message === "Wrong email") {
                  setErrorEmail(true);
                  return;
                } else if (data.message === "Wrong password") {
                  setErrorEmail(false);
                  setErrorPassword(true);
                  return;
                }
              })
              .catch((e) => {
                console.log(e);
              });
          };
          Signin();

          //     localStorage.setItem("id_user", findUser._id);

          //     localStorage.setItem("name_user", findUser.fullname);

          //     const action = addSession(localStorage.getItem("id_user"));
          //     dispatch(action);

          //     setCheckPush(true);
          // const findUser = user.find((value) => {
          //   console.log("value-->", value);
          //   return value.email === email;
          // });

          // console.log("finduser-->", findUser);

          // if (!findUser) {
          //   setErrorEmail(true);
          //   return;
          // } else {
          //   setErrorEmail(false);

          //   if (findUser.password !== password) {
          //     setErrorPassword(true);
          //     return;
          //   } else {
          //     setErrorPassword(false);

          //     localStorage.setItem("id_user", findUser._id);

          //     localStorage.setItem("name_user", findUser.fullname);

          //     const action = addSession(localStorage.getItem("id_user"));
          //     dispatch(action);

          //     setCheckPush(true);
          //   }
          // }
        }
      }
    }
  };

  //Hàm này dùng để đưa hết tất cả carts vào API của user
  // useEffect(() => {
  //   const fetchData = async () => {
  //     //Lần đầu sẽ không thực hiện insert được vì addCart = ''
  //     if (checkPush === true) {
  //       for (let i = 0; i < listCart.length; i++) {
  //         //Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
  //         const params = {
  //           idUser: localStorage.getItem("id_user"),
  //           idProduct: listCart[i].idProduct,
  //           count: listCart[i].count,
  //         };

  //         const query = "?" + queryString.stringify(params);

  //         // const response = await CartAPI.postAddToCart(query);
  //         // console.log(response);
  //       }

  //       setRedirect(true);
  //     }
  //   };

  //   // const getSessionLogin = async () => {
  //   //   const res = await axios.get("http://localhost:3500/api/auth/login");
  //   //   console.log("res-->", res);
  //   // };
  //   // getSessionLogin();
  //   axios
  //     .get("http://localhost:3500/api/auth/login")
  //     .then((resuilt) => {
  //       console.log("resuilt-->", resuilt);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   fetchData();
  // }, [checkPush, listCart]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>

          <div className="d-flex justify-content-center pb-5">
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password</span>
            )}
            {errorAuthorized && (
              <span className="text-danger">
                * You are not authorized to login
              </span>
            )}
          </div>

          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {redirect && <Navigate to="/" />}
            <button className="login100-form-btn" onClick={onSubmit}>
              Sign in
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
