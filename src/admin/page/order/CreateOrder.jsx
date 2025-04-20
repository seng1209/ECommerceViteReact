import { useState, useEffect } from "react";
import axios from "axios";

const CreateOrder = () => {
  const [users, setUsers] = useState([]);

  const [order, setOrder] = useState([]);

  const handleInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        import.meta.env.VITE_API_BASE + `orders`,
        order
      );
      result ? (window.location.href = "/admin/orders") : "";
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  const getUsers = async () => {
    try {
      const results = await axios.get(import.meta.env.VITE_API_BASE + `users`);
      setUsers(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Create Category</h5>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="user_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected>Username</option>
                    {users?.map((obj) => {
                      return (
                        <option value={obj.user_id}>{obj.username}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="total_amount"
                    className="form-control"
                    id=""
                    onChange={(e) => handleInputChange(e)}
                  />
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

export default CreateOrder;
