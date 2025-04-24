// Login.js
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  // This is where user was trying to go before being redirected to login
  const from = location.state?.from?.pathname || "/admin";

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/v1/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      // ✅ redirect to the page user originally wanted
      //   navigate(from, { replace: true });
      window.location.href = "/admin";
    } catch (err) {
      console.error(err);
      setError("Invalid Username or Password!");
      // alert("Login failed");
    }
  };

  return (
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
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="./index.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img
                        src="../assets/images/logos/dark-logo.svg"
                        width={180}
                        alt=""
                      />
                    </a>
                    <p className="text-center text-danger">
                      {error ? error : ""}
                    </p>
                    <form onSubmit={login}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Username
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          required
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input primary"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckChecked"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label text-dark"
                            htmlFor="flexCheckChecked"
                          >
                            Remeber this Device
                          </label>
                        </div>
                        <a className="text-primary fw-bold" href="./index.html">
                          Forgot Password ?
                        </a>
                      </div>
                      <button
                        // href="./index.html"
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                      >
                        Sign In
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                        <Link
                          className="text-primary fw-bold ms-2"
                          //   href="./authentication-register.html"
                          to={"/register"}
                        >
                          Create an account
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

    // <form onSubmit={login}>
    //   <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
    //   <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
    //   <button type="submit">Login</button>
    // </form>
  );
}

export default Login;
