import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PaymentList = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [shipments, setShipments] = useState([]);

  const getShipments = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `shipments`,
        config
      );
      setShipments(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShipments();
  }, []);

  const handleDeleteShipment = async (shipment_id) => {
    try {
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `shipments/${shipment_id}`,
        config
      );
      result ? window.location.reload() : "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create Payment
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Shipment Date</th>
            <th scope="col">Shipment Method</th>
            <th scope="col">User</th>
            <th scope="col">Order ID</th>
            <th scope="col">City</th>
            <th scope="col">Street Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {shipments?.map((obj) => {
            return (
              <tr>
                <td>{obj.shipment_id}</td>
                <td>{obj.shipment_date}</td>
                <td>{obj?.shipment_method?.name}</td>
                <td>{obj?.user.username}</td>
                <td>{obj.order_id}</td>
                <td>{obj.city}</td>
                <td>{obj.street_address}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.shipment_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDeleteShipment(obj.shipment_id)}
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

export default PaymentList;
