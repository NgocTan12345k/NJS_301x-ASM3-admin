import React, { useEffect, useState } from "react";
import convertMoney from "../convertMoney";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import ProductAPI from "../API/ProductAPI";

function Products(props) {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const onChangeText = (e) => {
    const value = e.target.value;
    setSearch(value);
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
    { field: "col6", headerName: "Quantity", width: 100 },
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
          col6: value.quantity,
        };
      });
  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await ProductAPI.getAllProduct();
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
      // const res = await axios.get(
      //   "http://localhost:3500/api/product/getAllProducts"
      // );

      // const data = res && res.data ? res.data : [];
      // setProducts(data);
    };

    getAllProducts();
  }, []);

  const handleDelete = async (col1) => {
    try {
      const response = await ProductAPI.deteleProduct(col1);
      // const res = await axios.delete(
      //   `http://localhost:3500/api/product/delete/${col1}`
      // );
      let resuilt = window.confirm("Want to delete Product??");
      if (resuilt && response.data === "Delete Product successful!") {
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
      </div>
    </>
  );
}

export default Products;
