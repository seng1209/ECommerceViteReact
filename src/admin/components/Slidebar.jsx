import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { SiBrandfolder } from "react-icons/si";
import { AiOutlineProduct } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { LuBox } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { SiAmazonpay } from "react-icons/si";

const Slidebar = () => {
  return (
    <>
      {/* Sidebar Start */}
      <aside className="left-sidebar">
        {/* Sidebar scroll*/}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <a href="./index.html" className="text-nowrap logo-img">
              <img
                src="../assets/images/logos/dark-logo.svg"
                width={180}
                alt=""
              />
            </a>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8" />
            </div>
          </div>
          {/* Sidebar navigation*/}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-layout-dashboard" />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/categories"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <TbCategoryPlus size={22} />
                  </span>
                  <span className="hide-menu">Category</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/brands"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <SiBrandfolder size={22} />
                  </span>
                  <span className="hide-menu">Brand</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/products"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <AiOutlineProduct size={22} />
                  </span>
                  <span className="hide-menu">Product</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/roles"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <AiFillSafetyCertificate size={22} />
                  </span>
                  <span className="hide-menu">Role</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/users"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <FaUserFriends size={22} />
                  </span>
                  <span className="hide-menu">User</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/orders"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <BsBagCheck size={22} />
                  </span>
                  <span className="hide-menu">Order</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/order-products"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <LuBox size={22} />
                  </span>
                  <span className="hide-menu">Order Products</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/shipment-methods"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <FaShippingFast size={22} />
                  </span>
                  <span className="hide-menu">Shipment Method</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/payment-methods"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <SiAmazonpay size={22} />
                  </span>
                  <span className="hide-menu">Payment Method</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/shipments"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <FaShippingFast size={22} />
                  </span>
                  <span className="hide-menu">Shipment</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  //   href="./index.html"
                  to="admin/payments"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <SiAmazonpay size={22} />
                  </span>
                  <span className="hide-menu">Payment</span>
                </Link>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">UI COMPONENTS</span>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./ui-buttons.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-article" />
                  </span>
                  <span className="hide-menu">Buttons</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./ui-alerts.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-alert-circle" />
                  </span>
                  <span className="hide-menu">Alerts</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./ui-card.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-cards" />
                  </span>
                  <span className="hide-menu">Card</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./ui-forms.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-file-description" />
                  </span>
                  <span className="hide-menu">Forms</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./ui-typography.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-typography" />
                  </span>
                  <span className="hide-menu">Typography</span>
                </a>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">AUTH</span>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./authentication-login.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-login" />
                  </span>
                  <span className="hide-menu">Login</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./authentication-register.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-user-plus" />
                  </span>
                  <span className="hide-menu">Register</span>
                </a>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">EXTRA</span>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./icon-tabler.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-mood-happy" />
                  </span>
                  <span className="hide-menu">Icons</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link"
                  href="./sample-page.html"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-aperture" />
                  </span>
                  <span className="hide-menu">Sample Page</span>
                </a>
              </li>
            </ul>
            <div className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
              <div className="d-flex">
                <div className="unlimited-access-title me-3">
                  <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">
                    Upgrade to pro
                  </h6>
                  <a
                    href="https://adminmart.com/product/modernize-bootstrap-5-admin-template/"
                    target="_blank"
                    className="btn btn-primary fs-2 fw-semibold lh-sm"
                  >
                    Buy Pro
                  </a>
                </div>
                <div className="unlimited-access-img">
                  <img
                    src="../assets/images/backgrounds/rocket.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </nav>
          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>
      {/*  Sidebar End */}
    </>
  );
};

export default Slidebar;
