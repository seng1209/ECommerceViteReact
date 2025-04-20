import { useState } from "react";
// import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
                      <Route path="" element={<Dashboard />} />

                      <Route path="categories" element={<CategoryList />} />
                      <Route
                        path="categories/create"
                        element={<CreateCategory />}
                      />
                      <Route
                        path="categories/update/:category_id"
                        element={<UpdateCategory />}
                      />
                      <Route path="brands" element={<BrandList />} />
                      <Route path="brands/create" element={<CreateBrand />} />
                      <Route
                        path="brands/update/:brand_id"
                        element={<UpdateBrand />}
                      />
                      <Route path="products" element={<ProductList />} />
                      <Route
                        path="products/create"
                        element={<CreateProduct />}
                      />
                      <Route
                        path="products/update/:product_id"
                        element={<UpdateProduct />}
                      />
                      <Route
                        path="shipment-methods"
                        element={<ShipmentMethodList />}
                      />
                      <Route
                        path="shipment-methods/create"
                        element={<CreateShipmentMethod />}
                      />
                      <Route
                        path="shipment-methods/update/:name"
                        element={<UpdateShipmentMethod />}
                      />
                      <Route
                        path="payment-methods"
                        element={<PaymentMethodList />}
                      />
                      <Route
                        path="payment-methods/create"
                        element={<CreatePaymentMethod />}
                      />
                      <Route
                        path="payment-methods/update/:name"
                        element={<UpdatePaymentMethod />}
                      />
                      <Route path="roles" element={<RoleList />} />
                      <Route path="roles/create" element={<CreateRole />} />
                      <Route
                        path="roles/update/:role_name"
                        element={<UpdateRole />}
                      />
                      <Route path="users" element={<UserList />} />
                      <Route path="users/create" element={<CreateUser />} />
                      <Route
                        path="users/update/:username"
                        element={<UpdateUser />}
                      />
                      <Route path="orders" element={<OrderList />} />
                      <Route path="orders/create" element={<CreateOrder />} />
                      <Route
                        path="orders/update/:order_id"
                        element={<UpdateOrder />}
                      />
                      <Route
                        path="order-products"
                        element={<OrderProductsList />}
                      />
                      <Route
                        path="order-products/create"
                        element={<CreateOrderProducts />}
                      />
                      <Route
                        path="order-products/update/:order_detail_id"
                        element={<UpdateOrderProducts />}
                      />
                      <Route path="payments" element={<PaymentList />} />
                      <Route
                        path="payments/create"
                        element={<CreatePayment />}
                      />
                      <Route
                        path="payments/update/:payment_id"
                        element={<UpdatePayment />}
                      />
                      <Route path="shipments" element={<ShipmentList />} />
                      <Route
                        path="shipments/create"
                        element={<CreateShipment />}
                      />
                      <Route
                        path="shipments/update/:shipment_id"
                        element={<UpdateShipment />}
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
