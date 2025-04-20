import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { username } = useParams();

  const [user, setUser] = useState([]);

  const getUser = async (username) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `users/${username}`
      );
      setUser(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(username);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Forms</h5>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Username
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    name="username"
                    value={user.username}
                    id=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <input
                    disabled
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email}
                    id=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Phone
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    name="phone"
                    value={user.phone}
                    id=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Address
                  </label>
                  <textarea
                    disabled
                    name="address"
                    value={user.address}
                    rowa={3}
                    className="form-control"
                    id=""
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
