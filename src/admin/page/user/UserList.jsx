import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `users`,
        config
      );
      setUsers(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = async (username, image_name) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_BASE + `delete-image/${image_name}`,
        config
      );
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `users/${username}`,
        config
      );
      result ? window.location.reload() : "";
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((obj) => {
            return (
              <tr key={obj.user_id}>
                <td>{obj.user_id}</td>
                <td>
                  <img src={obj.image} alt={obj.image} width="200px" />
                </td>
                <td>{obj.username}</td>
                <td>{obj.email}</td>
                <td>{obj.phone}</td>
                <td>{obj.address}</td>
                {/* <td className="d-flex">
                  <Link
                    to={`update/${obj.username}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      handleDeleteUser(obj.username, obj.image_name)
                    }
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
