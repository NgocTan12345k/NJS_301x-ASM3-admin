import React from "react";
import Logoicon from "../Image/logo-icon.png";
import Logotext from "../Image/logo-text.png";
import Logolight from "../Image/logo-light-text.png";

const userName = localStorage.getItem("name_user");
const role = localStorage.getItem("role");

const handleLogout = () => {
  localStorage.clear();
};

function Header(props) {
  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          <div className="navbar-brand">
            <a href="/">
              <b className="logo-icon">
                <img src={Logoicon} alt="homepage" className="dark-logo" />
                <img src={Logoicon} alt="homepage" className="light-logo" />
              </b>
              <span className="logo-text">
                <img src={Logotext} alt="homepage" className="dark-logo" />
                <img src={Logolight} className="light-logo" alt="homepage" />
              </span>
            </a>
          </div>
        </div>
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1"></ul>
          <ul className="navbar-nav float-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="ml-2 d-none d-lg-inline-block">
                  <span>Hello {userName ? userName : ""}</span>{" "}
                  <span className="text-dark">{role ? role : ""}</span>{" "}
                  <i data-feather="chevron-down" className="svg-icon"></i>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right user-dd animated flipInY"
                onClick={handleLogout}
              >
                <a className="dropdown-item" href="/signin">
                  <i data-feather="power" className="svg-icon mr-2 ml-1"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
