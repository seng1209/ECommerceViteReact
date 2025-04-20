import { useState, useEffect } from "react";
import axios from "axios";

const CreateShipment = () => {
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
      const result = await axios.post(
        import.meta.env.VITE_API_BASE + `shipments`,
        shipment
      );
      result ? (window.location.href = "/admin/shipments") : "";
      //   console.log(shipment);
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  const getShipmentMethods = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `shipment_methods`
      );
      setShipementMethods(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrders = async () => {
    try {
      const results = await axios.get(import.meta.env.VITE_API_BASE + `orders`);
      setOrders(results.data.data);
    } catch (err) {
      console.log(err);
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
    getShipmentMethods();
    getOrders();
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
                    <option selected>Shipment Method</option>
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
                    <option selected disabled>
                      User
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
                    <option selected="">Order</option>
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

export default CreateShipment;
