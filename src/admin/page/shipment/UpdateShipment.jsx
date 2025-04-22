import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateShipment = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { shipment_id } = useParams();

  const [shipment, setShipment] = useState([]);

  const [shipmentMethods, setShipementMethods] = useState([]);

  const [users, setUsers] = useState([]);

  const [orders, setOrders] = useState([]);

  const handleInputChange = (e) => {
    setShipment({ ...shipment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        import.meta.env.VITE_API_BASE + `shipments/${shipment_id}`,
        shipment,
        config
      );
      result ? (window.location.href = "/admin/shipments") : "";
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  const getShipment = async (shipment_id) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `shipments/${shipment_id}`,
        config
      );
      setShipment(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getShipmentMethods = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `shipment_methods`,
        config
      );
      setShipementMethods(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrders = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `orders`,
        config
      );
      setOrders(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    getShipmentMethods();
    getOrders();
    getShipment(shipment_id);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Create Shipment</h5>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="shipment_method_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option
                      selected
                      disabled
                      value={shipment?.shipment_method?.shipment_method_id}
                    >
                      {shipment?.shipment_method?.name}
                    </option>
                    {shipmentMethods?.map((obj) => {
                      return (
                        <option value={obj.shipment_method_id}>
                          {obj.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    name="user_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected disabled value={shipment?.user?.user_id}>
                      {shipment?.user?.username}
                    </option>
                    ;
                    {users?.map((obj) => {
                      return (
                        <option value={obj.user_id}>{obj.username}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="order_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected disabled value={shipment?.order_id}>
                      {shipment?.order_id}
                    </option>
                    {orders?.map((obj) => {
                      return (
                        <option value={obj.order_id}>{obj.order_id}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={shipment.city}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Street Address
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="street_address"
                    value={shipment.street_address}
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

export default UpdateShipment;
