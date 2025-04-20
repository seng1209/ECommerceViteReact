import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const results = await axios.get(import.meta.env.VITE_API_BASE + `roles`);
      setRoles(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleDeleteRole = async (role) => {
    try {
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `roles/${role}`
      );
      result ? window.location.reload() : "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Role
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Role</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {roles?.map((obj) => {
            return (
              <tr key={obj.role_id}>
                <td>{obj.role_id}</td>
                <td>{obj.role}</td>
                <td>{obj.description}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.role}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDeleteRole(obj.role)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
