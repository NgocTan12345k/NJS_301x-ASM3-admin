import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "./Chat/Chat";
// import Header from "./Header/Header";
import History from "./History/History";
import Home from "./Home/Home";
// import Menu from "./Menu/Menu";
import Products from "./Products/Products";
import Users from "./Users/Users";
import SignIn from "./Authentication/SignIn";
import AddNewProduct from "./Products/AddNewProduct";
import UpdateProduct from "./Products/UpdateProduct";

// import SignUp from "./Authentication/SignUp";

function App() {
  const ProtectedtRoute = ({ children }) => {
    const user = localStorage.getItem("name_user");

    if (!user) {
      return <Navigate to="/signin" />;
    } else {
      return children;
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          {/* <Routes>
            <Route path="/signin" element={<SignIn />} />

            <Route
              exact
              path="/"
              element={
                <ProtectedtRoute>
                  <Home />
                </ProtectedtRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedtRoute>
                  <Chat />
                </ProtectedtRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedtRoute>
                  <Users />
                </ProtectedtRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedtRoute>
                  <Products />
                </ProtectedtRoute>
              }
            />
            <Route
              path="/products/AddNewProduct"
              element={
                <ProtectedtRoute>
                  <AddNewProduct />
                </ProtectedtRoute>
              }
            />
            <Route
              path="/products/update/:id"
              element={
                <ProtectedtRoute>
                  <UpdateProduct />
                </ProtectedtRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedtRoute>
                  <History />
                </ProtectedtRoute>
              }
            />
            {/* <Route path="/signup" component={SignUp} /> */}
          {/* </Routes> */}
          <Routes>
            <Route path="/">
              <Route path="signin" element={<SignIn />} />

              <Route
                index
                element={
                  <ProtectedtRoute>
                    <Home />
                  </ProtectedtRoute>
                }
              />
              <Route
                path="chat"
                element={
                  <ProtectedtRoute>
                    <Chat />
                  </ProtectedtRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedtRoute>
                    <Users />
                  </ProtectedtRoute>
                }
              />
              <Route path="products">
                <Route
                  index
                  element={
                    <ProtectedtRoute>
                      <Products />
                    </ProtectedtRoute>
                  }
                />
                <Route
                  path="AddNewProduct"
                  element={
                    <ProtectedtRoute>
                      <AddNewProduct />
                    </ProtectedtRoute>
                  }
                />
                <Route
                  path="update/:id"
                  element={
                    <ProtectedtRoute>
                      <UpdateProduct />
                    </ProtectedtRoute>
                  }
                />
              </Route>
              <Route
                path="/history"
                element={
                  <ProtectedtRoute>
                    <History />
                  </ProtectedtRoute>
                }
              />
              {/* <Route path="/signup" component={SignUp} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
