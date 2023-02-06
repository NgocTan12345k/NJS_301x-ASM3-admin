import React from "react";

const role = localStorage.getItem("role");

function Menu(props) {
  if (role && role === "admin") {
    return (
      <aside className="left-sidebar" data-sidebarbg="skin6">
        <div className="scroll-sidebar" data-sidebarbg="skin6">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li className="sidebar-item">
                {" "}
                <a className="sidebar-link sidebar-link" href="/">
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">Dashboard</span>
                </a>
              </li>
              <li className="list-divider"></li>

              <li className="nav-small-cap">
                <span className="hide-menu">Components</span>
              </li>
              <li className="sidebar-item">
                {" "}
                <a className="sidebar-link sidebar-link" href="/chat">
                  <i data-feather="message-square" className="feather-icon"></i>
                  <span className="hide-menu">Customer</span>
                </a>
              </li>

              <li className="sidebar-item">
                {" "}
                <a
                  className="sidebar-link has-arrow"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="grid" className="feather-icon"></i>
                  <span className="hide-menu">Tables </span>
                </a>
                <ul
                  aria-expanded="false"
                  className="collapse  first-level base-level-line"
                >
                  <li className="sidebar-item">
                    <a href="/products" className="sidebar-link">
                      <span className="hide-menu">Datatables Products</span>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="list-divider"></li>
              <li className="nav-small-cap">
                <span className="hide-menu">Authentication</span>
              </li>

              <li className="sidebar-item">
                {" "}
                <a
                  className="sidebar-link sidebar-link"
                  href="/signin"
                  aria-expanded="false"
                >
                  <i data-feather="lock" className="feather-icon"></i>
                  <span className="hide-menu">Sign In</span>
                </a>
              </li>
              <li className="sidebar-item">
                {" "}
                <a
                  className="sidebar-link sidebar-link"
                  href="/#"
                  aria-expanded="false"
                >
                  <i data-feather="lock" className="feather-icon"></i>
                  <span className="hide-menu">Sign Up</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  } else if (role && role === "counselor") {
    return (
      <aside className="left-sidebar" data-sidebarbg="skin6">
        <div className="scroll-sidebar" data-sidebarbg="skin6">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li className="sidebar-item">
                {" "}
                <a className="sidebar-link sidebar-link" href="/">
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">Dashboard</span>
                </a>
              </li>
              <li className="list-divider"></li>

              <li className="nav-small-cap">
                <span className="hide-menu">Components</span>
              </li>
              <li className="sidebar-item">
                {" "}
                <a className="sidebar-link sidebar-link" href="/chat">
                  <i data-feather="message-square" className="feather-icon"></i>
                  <span className="hide-menu">Customer</span>
                </a>
              </li>

              <li className="list-divider"></li>
              <li className="nav-small-cap">
                <span className="hide-menu">Authentication</span>
              </li>

              <li className="sidebar-item">
                {" "}
                <a
                  className="sidebar-link sidebar-link"
                  href="/signin"
                  aria-expanded="false"
                >
                  <i data-feather="lock" className="feather-icon"></i>
                  <span className="hide-menu">Sign In</span>
                </a>
              </li>
              <li className="sidebar-item">
                {" "}
                <a
                  className="sidebar-link sidebar-link"
                  href="/#"
                  aria-expanded="false"
                >
                  <i data-feather="lock" className="feather-icon"></i>
                  <span className="hide-menu">Sign Up</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  } else {
    return (
      <aside className="left-sidebar" data-sidebarbg="skin6">
        <div className="scroll-sidebar" data-sidebarbg="skin6">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li className="sidebar-item">
                {" "}
                <a className="sidebar-link sidebar-link" href="/">
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">Dashboard</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default Menu;
