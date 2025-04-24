import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState();
  const [fileError, setFileError] = useState();
  const [user, setUser] = useState([]);
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("image", file);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwordValidator(user.password) && fileValidator(file)) {
        const imageResponse = await axios.post(
          import.meta.env.VITE_API_BASE + `upload-image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const userDto = {
          ...user,
          image: imageResponse.data.link,
          image_name: imageResponse.data.filename,
        };
        const result = await axios.post(
          import.meta.env.VITE_API_BASE + `register`,
          userDto
        );
        result ? (window.location.href = "/login") : "";
      }
    } catch (err) {
      if (err.response) {
        console.log("Error Response: " + err.response.data);
        console.log("Status Code: " + err.response.status);
      } else {
        console.log("Error: " + err.message);
      }
    }
  };

  const passwordValidator = (password) => {
    try {
      if (password.length < 6) {
        setError("The password field must be at least 6 characters.");
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const fileValidator = (file) => {
    try {
      if (!file) {
        setFileError("Image is required.");
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Body Wrapper */}
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
                    <form onSubmit={(e) => onSubmit(e)}>
                      {/* Name */}
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="name"
                          name="username"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>

                      {/* Password */}
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          required
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <div className="text-danger">{error ? error : ""}</div>
                      </div>

                      {/* Phone */}
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>

                      {/* Address */}
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          required
                          className="form-control"
                          id="address"
                          rows="2"
                          name="address"
                          onChange={(e) => handleInputChange(e)}
                        ></textarea>
                      </div>

                      {/* Upload Image */}
                      <div className="mb-4">
                        <label htmlFor="image" className="form-label">
                          Upload Profile Image
                        </label>
                        <input
                          required
                          type="file"
                          className="form-control"
                          id="image"
                          accept="image/*"
                          name="file"
                          onChange={(e) => handleFileChange(e)}
                        />
                        <div className="text-danger">
                          {fileError ? fileError : ""}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                      >
                        Sign Up
                      </button>

                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">
                          Already have an Account?
                        </p>
                        <Link className="text-primary fw-bold ms-2" to="/login">
                          Sign In
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
  );
};

export default Register;
