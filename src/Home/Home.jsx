import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import axios from "axios";
import convertMoney from "../convertMoney";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
Home.propTypes = {};

function Home(props) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const res = await axios.get("http://localhost:3500/api/users");
      // console.log("res-->", res);
      const data = res && res.data ? res.data : [];
      setUsers(data);
    };

    const getOrders = async () => {
      const res = await axios.get(
        "http://localhost:3500/api/order/getAllOrders"
      );
      const data = res && res.data ? res.data : [];
      setOrders(data);
    };
    getClients();
    getOrders();
  }, []);

  // COUNT CLIENT

  const clientList = users.filter((item) => {
    return item.role === "client";
  });

  const countClients = clientList.length;

  // COUNT ORDERS
  // console.log("orders-->", orders);
  const countOrders = orders.length;

  // COUNT TOTAL MONEY
  const totalList = orders.map((item) => {
    return item.total;
  });
  const initialValue = 0;
  const totalMoney = totalList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  // console.log("totalMoney-->", totalMoney);

  // COUNT MONEY PER MONTH
  const moneyPerMonth = Math.ceil(totalMoney / 12);
  // console.log("moneyPerMonth", moneyPerMonth);

  // GET THE LAST 8 ORDERS
  const sortOrdersByDate = orders.sort((a, b) => {
    return b.updatedAt - a.updatedAt;
  });

  const get8lastOrders = sortOrdersByDate.slice(0, 8);
  // console.log("get8lastOrders", get8lastOrders);

  const orderColumns = [
    { field: "col1", headerName: "ID User", width: 250 },
    { field: "col2", headerName: "Name", width: 150 },
    { field: "col3", headerName: "Phone", width: 120 },
    {
      field: "col4",
      headerName: "Address",
      width: 150,
    },
    { field: "col5", headerName: "Total", width: 120 },
    { field: "col6", headerName: "Delivery", width: 150 },
    { field: "col7", headerName: "Status", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (products) => {
        return (
          <div className="btn btn-success">
            <Link
              // to={`/hotels/updateHotel/${hotels.row.col1}`}
              style={{
                textDecoration: "none",
                color: "green",
              }}
            >
              View
            </Link>
          </div>
        );
      },
    },
  ];

  // console.log("products-->", products);

  const orderRows =
    get8lastOrders &&
    get8lastOrders.length > 0 &&
    get8lastOrders.map((value, index) => {
      return {
        id: index + 1,
        col1: value._id,
        col2: value.userName,
        col3: value.phone,
        col4: value.address,
        col5: convertMoney(value.total),
        col6: !value.delivery ? "Waiting for progressing" : "Processed",
        col7: !value.status ? "Waiting for pay" : "Paid",
      };
    });

  return (
    <>
      <Header />
      <Menu />
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              {/* <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                Good Morning Jason!
              </h3> */}
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb m-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="card-group">
            <div className="card border-right">
              <div className="card-body">
                <div className="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div className="d-inline-flex align-items-center">
                      <h2 className="text-dark mb-1 font-weight-medium">
                        {countClients}
                      </h2>
                      {/* <span className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">
                        +18.33%
                      </span> */}
                    </div>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Clients
                    </h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted">
                      <i data-feather="user-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-right">
              <div className="card-body">
                <div className="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                      {convertMoney(totalMoney)}{" "}
                      <sup className="set-doller">VND</sup>
                    </h2>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Total Earnings
                    </h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted">
                      <i data-feather="dollar-sign"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-right">
              <div className="card-body">
                <div className="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div className="d-inline-flex align-items-center">
                      <h2 className="text-dark mb-1 font-weight-medium">
                        {countOrders}
                      </h2>
                      {/* <span className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">
                        -18.33%
                      </span> */}
                    </div>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Orders:
                    </h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted">
                      <i data-feather="file-plus"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <h2 className="text-dark mb-1 font-weight-medium">
                      {convertMoney(moneyPerMonth)}
                    </h2>
                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Earnings Per Month
                    </h6>
                  </div>
                  <div className="ml-auto mt-md-3 mt-lg-0">
                    <span className="opacity-7 text-muted">
                      <i data-feather="dollar-sign"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-4">
                    <h4 className="card-title">History</h4>
                    <div className="ml-auto">
                      <div className="dropdown sub-dropdown">
                        {/* <button
                          className="btn btn-link text-muted dropdown-toggle"
                          type="button"
                          id="dd1"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i data-feather="more-vertical"></i>
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dd1"
                        >
                          <a className="dropdown-item" href="#">
                            Insert
                          </a>
                          <a className="dropdown-item" href="#">
                            Update
                          </a>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="table-responsive">
                    <table className="table no-wrap v-middle mb-0"> */}
                  {/* <thead>
                        <tr className="border-0">
                          <th className="border-0 font-14 font-weight-medium text-muted">
                            Team Lead
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted px-2">
                            Project
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted text-center">
                            Status
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted text-center">
                            Weeks
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted">
                            Budget
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-top-0 px-2 py-4">
                            <div className="d-flex no-block align-items-center">
                              <div className="mr-3">
                                <img
                                  src="../assets/images/users/IMG_6225.jpg"
                                  alt="user"
                                  className="rounded-circle"
                                  width="45"
                                  height="45"
                                />
                              </div>
                              <div className="">
                                <h5 className="text-dark mb-0 font-16 font-weight-medium">
                                  Nguyen Kim Tien
                                </h5>
                                <span className="text-muted font-14">
                                  tienkim9920@gmail.com
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="border-top-0 text-muted px-2 py-4 font-14">
                            Admin
                          </td>

                          <td className="border-top-0 text-center px-2 py-4">
                            <i
                              className="fa fa-circle text-primary font-12"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="In Testing"
                            ></i>
                          </td>
                          <td className="border-top-0 text-center font-weight-medium text-muted px-2 py-4">
                            35
                          </td>
                          <td className="font-weight-medium text-dark border-top-0 px-2 py-4">
                            $99K
                          </td>
                        </tr>
                      </tbody> */}
                  {/* <thead className="bg-light">
                        <tr className="text-center"> */}
                  {/* <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              ID Order
                            </strong>
                          </th> */}
                  {/* <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              ID User
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Name
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Phone
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Address
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Total
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Delivery
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Status
                            </strong>
                          </th>
                          <th className="border-0" scope="col">
                            {" "}
                            <strong className="text-small text-uppercase">
                              Detail
                            </strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {get8lastOrders &&
                          get8lastOrders.map((value) => (
                            <tr className="text-center" key={value._id}> */}
                  {/* <td className="align-middle border-0">
                                <p className="mb-0 small">{value._id}</p>
                              </td> */}
                  {/* <td className="align-middle border-0">
                                <p className="mb-0 small">{value.idUser}</p>
                              </td>
                              <td className="align-middle border-0">
                                <p className="mb-0 small">{value.userName}</p>
                              </td>
                              <td className="align-middle border-0">
                                <p className="mb-0 small">{value.phone}</p>
                              </td>
                              <td className="align-middle border-0">
                                <p className="mb-0 small">{value.address}</p>
                              </td>
                              <td className="align-middle border-0">
                                <p className="mb-0 small">
                                  {convertMoney(value.total)} VND
                                </p>
                              </td>
                              <td className="align-middle border-0">
                                <p className="mb-0 small"> */}
                  {/* {!value.delivery
                                  ? "Waiting for progressing"
                                  : "Processed"} */}
                  {/* {value.delivery}
                                </p>
                              </td>
                              <td className="align-middle border-0">
                                <p className="mb-0 small"> */}
                  {/* {!value.status ? "Waiting for pay" : "Paid"} */}
                  {/* {value.status}
                                </p>
                              </td>
                              <td className="align-middle border-0">
                                <Link
                                  className="btn btn-outline-dark btn-sm"
                                  to={`/history/${value._id}`}
                                >
                                  View */}
                  {/* <i className="fas fa-long-arrow-alt-right ml-2"></i> */}
                  {/* </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div> */}
                  <div style={{ height: "350px", width: "100%" }}>
                    <DataGrid
                      className="datagrid"
                      rows={orderRows}
                      columns={orderColumns.concat(actionColumn)}
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
      </div>
    </>
  );
}

export default Home;
