import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import convertMoney from "../convertMoney";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

// import io from "socket.io-client";
// const socket = io("http://localhost:3500", { transports: ["websocket"] });

function History(props) {
  const [history, setHistory] = useState([]);

  const [load, setLoad] = useState(false);

  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryAPI.getAll();
      console.log(response);

      setHistory(response);
    };

    fetchData();
  }, []);

  //Hàm này dùng để nhận socket từ server gửi lên
  // useEffect(() => {
  //   //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_order
  //   socket.on("receive_order", (data) => {
  //     setText("User ID: " + data + " Vừa Đặt Hàng");

  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 4000);
  //   });
  // }, []);

  const historyColumns = [
    { field: "col1", headerName: "ID", width: 250 },
    { field: "col2", headerName: "Name", width: 250 },
    { field: "col3", headerName: "Phone", width: 150 },
    {
      field: "col4",
      headerName: "Image",
      width: 150,
    },
    { field: "col5", headerName: "Category", width: 100 },
    { field: "col6", headerName: "Edit", width: 150 },
    { field: "col7", headerName: "Category", width: 100 },
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
              // onClick={() => handleDelete(hotels.row.col1)}
            >
              Delete
            </div>
            <div className="btn btn-success">
              <Link
                // to={`/hotels/updateHotel/${hotels.row.col1}`}
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

  const historyRows =
    history &&
    history.length > 0 &&
    history.map((value, index) => {
      return {
        id: index + 1,
        col1: value._id,
        col2: value.name,
        col3: convertMoney(value.price),
        col4: value.img1,
        col5: value.category,
      };
    });

  console.log("history-->", history);

  return (
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
                      History
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
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">History</h4>
                <h3>{text}</h3>
                <input
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                {/* <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history &&
                        history.map((value) => (
                          <tr key={value._id}>
                            <td>{value.idUser}</td>
                            <td>{value.fullname}</td>
                            <td>{value.phone}</td>
                            <td>{value.address}</td>
                            <td>{value.total}</td>
                            <td>
                              {value.delivery
                                ? "Đã Vận Chuyển"
                                : "Chưa Vận Chuyển"}
                            </td>
                            <td>
                              {value.status
                                ? "Đã Thanh Toán"
                                : "Chưa Thanh Toán"}
                            </td>
                            <td>
                              <a
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-success"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div> */}
                <DataGrid
                  className="datagrid"
                  rows={historyRows}
                  columns={historyColumns.concat(actionColumn)}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
