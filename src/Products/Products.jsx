import React, { useEffect, useState } from "react";
// import queryString from "query-string";
// import ProductAPI from "../API/ProductAPI";
// import Pagination from "./Component/Pagination";
import axios from "axios";
import convertMoney from "../convertMoney";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

function Products(props) {
  const [products, setProducts] = useState([]);

  // const [pagination, setPagination] = useState({
  //   page: "1",
  //   count: "8",
  //   search: "",
  //   category: "all",
  // });

  const [search, setSearch] = useState("");

  const onChangeText = (e) => {
    const value = e.target.value;
    // console.log("value-->", value);
    // console.log("product-->", products);
    // const searchItem = products.filter((item) => {
    //   return item.name.toLowerCase().includes(value.toLowerCase());
    // });

    // console.log("searchItem-->", searchItem);
    setSearch(value);

    // setPagination({
    //   page: pagination.page,
    //   count: pagination.count,
    //   search: value,
    //   category: pagination.category,
    // });
  };
  const productColumns = [
    { field: "col1", headerName: "ID", width: 250 },
    { field: "col2", headerName: "Name", width: 250 },
    { field: "col3", headerName: "Price", width: 150 },
    {
      field: "col4",
      headerName: "Image",
      width: 150,
      renderCell: (params) => <Avatar src={params.row.col4} />,
    },
    { field: "col5", headerName: "Category", width: 100 },
    // { field: "col6", headerName: "Edit", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (products) => {
        return (
          <div>
            <div
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={() => handleDelete(products.row.col1)}
            >
              Delete
            </div>
            <div className="btn btn-success">
              <Link
                to={`/products/update/${products.row.col1}`}
                style={{
                  textDecoration: "none",
                  color: "green",
                }}
              >
                Update
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

  // console.log("products-->", products);

  const productRows =
    products &&
    products.length > 0 &&
    products
      .filter((item) => {
        if (search === "") {
          return item;
        } else {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }
      })
      .map((value, index) => {
        return {
          id: index + 1,
          col1: value._id,
          col2: value.name,
          col3: convertMoney(value.price),
          col4: value.img1,
          col5: value.category,
        };
      });
  // console.log("productRow-->", productRows);

  // //Tổng số trang
  // const [totalPage, setTotalPage] = useState();

  // //Hàm này dùng để thay đổi state pagination.page
  // //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  // const handlerChangePage = (value) => {
  //   // console.log("Value: ", value);

  //   //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
  //   setPagination({
  //     page: value,
  //     count: pagination.count,
  //     search: pagination.search,
  //     category: pagination.category,
  //   });
  // };

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const getAllProducts = async () => {
      // const response = await ProductAPI.getAPI()
      const res = await axios.get(
        "http://localhost:3500/api/product/getAllProducts"
      );
      // console.log("res-->", res);
      const data = res && res.data ? res.data : [];
      setProducts(data);

      // //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      // const totalPage = Math.ceil(
      //   parseInt(data.length) / parseInt(pagination.count)
      // );
      // // console.log("totalPage-->", totalPage);

      // setTotalPage(totalPage);
    };

    getAllProducts();
  }, []);

  const handleDelete = async (col1) => {
    // console.log("col1-->", col1);
    try {
      const res = await axios.delete(
        `http://localhost:3500/api/product/delete/${col1}`
      );
      let resuilt = window.confirm("Want to delete Product??");
      if (resuilt && res.data === "Delete Product successful!") {
        setProducts(
          products.filter((item) => {
            return item._id !== col1;
          })
        );
      } else {
        alert("Delete Product Unsuccessful!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // //Gọi hàm Pagination
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const params = {
  //       page: pagination.page,
  //       count: pagination.count,
  //       search: pagination.search,
  //       category: pagination.category,
  //     };

  //     const query = queryString.stringify(params);

  //     const newQuery = "?" + query;

  //     const response = await ProductAPI.getPagination(newQuery);
  //     console.log(response);
  //   };

  //   fetchData();
  // }, [pagination]);

  return (
    <>
      <Header />
      <Menu />
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                Basic Initialisation
              </h4>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="/" className="text-muted">
                        Home
                      </a>
                    </li>
                    <li
                      className="breadcrumb-item text-muted active"
                      aria-current="page"
                    >
                      Table
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <a href="/products/AddNewProduct" className="link">
              Add New
            </a>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Products</h4>
                  <input
                    className="form-control w-25"
                    onChange={onChangeText}
                    type="text"
                    placeholder="Enter Search!"
                  />
                  <br />
                  {/* <div className="table-responsive">
                    <table className="table table-striped table-bordered no-wrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Category</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.length > 0 &&
                          products
                            .filter((item) => {
                              if (search === "") {
                                return item;
                              } else {
                                return item.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase());
                              }
                            })
                            .map((value) => (
                              <tr key={value._id}>
                                <td>{value._id}</td>
                                <td>{value.name}</td>
                                <td>{convertMoney(value.price)} VND</td>
                                <td>
                                  <img
                                    src={value.img1}
                                    style={{ height: "60px", width: "60px" }}
                                    alt=""
                                  />
                                </td>
                                <td>{value.category}</td>
                                <td>
                                  <a
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                    }}
                                    className="btn btn-success"
                                  >
                                    Update
                                  </a>
                                  &nbsp;
                                  <a
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                    }}
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                    <Pagination
                      pagination={pagination}
                      handlerChangePage={handlerChangePage}
                      totalPage={totalPage}
                    />
                  </div> */}
                  <div style={{ height: "500px", width: "100%" }}>
                    <DataGrid
                      className="datagrid"
                      rows={productRows}
                      columns={productColumns.concat(actionColumn)}
                      pageSize={9}
                      rowsPerPageOptions={[9]}
                      checkboxSelection
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="https://www.facebook.com/KimTien.9920/">Tiền Kim</a>.
      </footer> */}
      </div>
    </>
  );
}

export default Products;
