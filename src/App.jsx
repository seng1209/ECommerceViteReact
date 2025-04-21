import { useState } from "react";
// import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleRoute from "./aurh/RoleRoute";

// customer
/*
  components
*/
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Slider from "./components/Slider";
import Cart from "./components/Cart";
import Banner from "./components/Banner";
import BackToTop from "./components/BackToTop";
import Breadcrumb from "./components/Breadcrumb";
import TitlePage from "./components/TitlePage";
import Footer from "./components/Footer";
import Model1 from "./components/Model1";
/*
  page
*/
import HomePage from "./page/HomePage";
import ShoppingPage from "./page/ShoppingPage";
import ProductPage from "./page/ProductPage";
import BlogPage from "./page/BlogPage";
import AboutPage from "./page/AboutPage";
import ProductDetail from "./page/ProductDetail";
// admin
/*
  components
*/
import HeaderAdmin from "./admin/components/Header";
import Slidebar from "./admin/components/Slidebar";
/*
  page
*/
import Dashboard from "./admin/page/Dashboard";
// category
import CategoryList from "./admin/page/category/CategoryList";
import CreateCategory from "./admin/page/category/CreateCategory";
import UpdateCategory from "./admin/page/category/UpdateCategory";
// brand
import BrandList from "./admin/page/brand/BrandList";
import CreateBrand from "./admin/page/brand/CreateBrand";
import UpdateBrand from "./admin/page/brand/UpdateBrand";
// product
import ProductList from "./admin/page/product/ProductList";
import CreateProduct from "./admin/page/product/CreateProduct";
import UpdateProduct from "./admin/page/product/UpdateProduct";
// shipment method
import ShipmentMethodList from "./admin/page/shipment_method/ShipmentMehtodList";
import CreateShipmentMethod from "./admin/page/shipment_method/CreateShipmentMethod";
import UpdateShipmentMethod from "./admin/page/shipment_method/UpdateShipmentMethod";
// payment method
import PaymentMethodList from "./admin/page/payment-method/PaymentMethodList";
import CreatePaymentMethod from "./admin/page/payment-method/CreatePaymentMethod";
import UpdatePaymentMethod from "./admin/page/payment-method/UpdatePaymentMethod";
// role
import RoleList from "./admin/page/role/RoleList";
import CreateRole from "./admin/page/role/CreateRole";
import UpdateRole from "./admin/page/role/UpdateRole";
//user
import UserList from "./admin/page/user/UserList";
import CreateUser from "./admin/page/user/CreateUser";
import UpdateUser from "./admin/page/user/UpdateUser";
//order
import OrderList from "./admin/page/order/OrderList";
import CreateOrder from "./admin/page/order/CreateOrder";
import UpdateOrder from "./admin/page/order/UpdateOrder";
//order_products
import OrderProductsList from "./admin/page/order_product/OrderProductsList";
import CreateOrderProducts from "./admin/page/order_product/CreateOrderProducts";
import UpdateOrderProducts from "./admin/page/order_product/UpdateOrderProducts";
// payment
import PaymentList from "./admin/page/paymen/PaymentList";
import CreatePayment from "./admin/page/paymen/CreatePayment";
import UpdatePayment from "./admin/page/paymen/UpdatePayment";
// shipment
import ShipmentList from "./admin/page/shipment/ShipementList";
import CreateShipment from "./admin/page/shipment/CreateShipment";
import UpdateShipment from "./admin/page/shipment/UpdateShipment";
// context
import { CartProvider } from "./context/CartContext";
// auth
import Login from "./aurh/Login";
import Register from "./aurh/Register";
//
function App() {
  const page = window.location.href.split("/")[3];

  return (
    <CartProvider>
      <Router>
        {/* admin */}
        {page == "admin" ? (
          <>
            {/*  Body Wrapper */}
            <div
              className="page-wrapper"
              id="main-wrapper"
              data-layout="vertical"
              data-navbarbg="skin6"
              data-sidebartype="full"
              data-sidebar-position="fixed"
              data-header-position="fixed"
            >
              {/* Sidebar Start */}
              <Slidebar />
              {/*  Sidebar End */}
              {/*  Main wrapper */}
              <div className="body-wrapper">
                {/*  Header Start */}
                <HeaderAdmin />
                {/*  Header End */}
                <div className="container-fluid">
                  <Routes>
                    <Route path="/admin">
                      <Route
                        path=""
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <Dashboard />
                          </RoleRoute>
                        }
                      />

                      <Route
                        path="categories"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CategoryList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="categories/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateCategory />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="categories/update/:category_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateCategory />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="brands"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <BrandList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="brands/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateBrand />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="brands/update/:brand_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateBrand />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="products"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <ProductList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="products/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateProduct />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="products/update/:product_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateProduct />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="shipment-methods"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <ShipmentMethodList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="shipment-methods/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateShipmentMethod />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="shipment-methods/update/:name"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateShipmentMethod />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="payment-methods"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <PaymentMethodList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="payment-methods/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreatePaymentMethod />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="payment-methods/update/:name"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdatePaymentMethod />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="roles"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <RoleList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="roles/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateRole />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="roles/update/:role_name"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateRole />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="users"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UserList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="users/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateUser />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="users/update/:username"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateUser />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="orders"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <OrderList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="orders/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateOrder />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="orders/update/:order_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateOrder />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="order-products"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <OrderProductsList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="order-products/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateOrderProducts />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="order-products/update/:order_detail_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateOrderProducts />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="payments"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <PaymentList />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="payments/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreatePayment />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="payments/update/:payment_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdatePayment />
                          </RoleRoute>
                        }
                      />
                      <Route path="shipments" element={<ShipmentList />} />
                      <Route
                        path="shipments/create"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <CreateShipment />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="shipments/update/:shipment_id"
                        element={
                          <RoleRoute allowedRoles={["ADMIN"]}>
                            <UpdateShipment />
                          </RoleRoute>
                        }
                      />
                    </Route>
                  </Routes>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* customer */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/">
                <Route path="" element={<HomePage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="shopping-cart" element={<ShoppingPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="product-detail" element={<ProductDetail />} />
              </Route>
            </Routes>
            <Footer />
            {/* <Model1 /> */}
          </>
        )}
      </Router>
    </CartProvider>
  );
}

export default App;
