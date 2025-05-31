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
                  to="admin/Sliders"
                  aria-expanded="false"
                >
                  <span>
                    {/* <i className="ti ti-layout-dashboard" /> */}
                    <TbCategoryPlus size={22} />
                  </span>
                  <span className="hide-menu">Slider</span>
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
            </ul>
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
