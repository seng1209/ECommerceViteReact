import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ShipmentMethodList = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [shipmentMethods, setShipmentMethods] = useState([]);

  const getShipmentMethods = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `shipment_methods`,
        config
      );
      //   console.log(results.data.data);
      setShipmentMethods(results.data.data);
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    getShipmentMethods();
  }, []);

  const handleDelete = async (name, image_name) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_BASE + `delete-image/${image_name}`,
        config
      );
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `shipment_methods/${name}`,
        config
      );
      result ? window.location.reload() : "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Shipment
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {shipmentMethods?.map((obj) => {
            return (
              <tr key={obj.shipment_method_id}>
                <td>{obj?.shipment_method_id}</td>
                <td>
                  <img src={obj.image} alt={obj.image} width="200px" />
                </td>
                <td>{obj.name}</td>
                <td>{obj.price}</td>
                <td>{obj.description}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.name}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDelete(obj.name, obj.image_name)}
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

export default ShipmentMethodList;
