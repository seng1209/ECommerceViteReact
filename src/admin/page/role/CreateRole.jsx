import { useState, useEffect } from "react";
import axios from "axios";

const CreateRole = () => {
  const [role, setRole] = useState([]);

  const handleInputChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        import.meta.env.VITE_API_BASE + `roles`,
        role
      );
      result ? (window.location.href = "/admin/roles") : "";
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Forms</h5>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="role"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="description"
                    onChange={(e) => handleInputChange(e)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
