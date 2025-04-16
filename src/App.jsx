import { useState } from "react";
// import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// customer
/*
  components
*/
import Header from "./components/Header";
import Slider from "./components/Slider";
import Cart from "./components/Cart";
import Banner from "./components/Banner";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Model1 from "./components/Model1";
/*
  page
*/
import HomePage from "./page/HomePage";

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
function App() {
  const admin = window.location.href.split("/")[3];

  return (
    <Router>
      {/* admin */}
      {admin ? (
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
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* customer */}
          {/* <div className="animsition"> */}
          <Header />
          <Cart />
          <Slider />
          <Banner />
          <Routes>
            <Route path="/">
              <Route path="" element={<HomePage />} />
            </Route>
          </Routes>
          <Footer />
          <Model1 />
          {/* </div> */}
        </>
      )}
    </Router>
  );
}

export default App;
