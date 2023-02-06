import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "./Chat/Chat";
import Home from "./Home/Home";
import Products from "./Products/Products";
import SignIn from "./Authentication/SignIn";
import AddNewProduct from "./Products/AddNewProduct";
import UpdateProduct from "./Products/UpdateProduct";

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
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
