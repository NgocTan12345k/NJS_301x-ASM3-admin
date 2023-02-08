import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import convertMoney from "../convertMoney";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import UserAPI from "../API/UserAPI";
import OrderAPI from "../API/OrderAPI";
Home.propTypes = {};

function Home(props) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await UserAPI.getAllUser();
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
      // const res = await axios.get("http://localhost:3500/api/users");
      // const data = res && res.data ? res.data : [];
      // setUsers(data);
    };

    const getOrders = async () => {
      const response = await OrderAPI.getAllOrder();
      setOrders(response);
      // const res = await axios.get(
      //   "http://localhost:3500/api/order/getAllOrders"
      // );
      // const data = res && res.data ? res.data : [];
      // setOrders(data);
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

  // COUNT MONEY PER MONTH
  const moneyPerMonth = Math.ceil(totalMoney / 12);

  // GET THE LAST 8 ORDERS
  const sortOrdersByDate = orders.sort((a, b) => {
    return b.updatedAt - a.updatedAt;
  });

  const get8lastOrders = sortOrdersByDate.slice(0, 8);

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
                      <div className="dropdown sub-dropdown"></div>
                    </div>
                  </div>

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
