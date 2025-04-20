import { useState, useEffect } from "react";
import axios from "axios";

const CreatePayment = () => {
  const [payment, setPayment] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [orders, setOrders] = useState([]);

  const handleInputChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        import.meta.env.VITE_API_BASE + `payments`,
        payment
      );
      result ? (window.location.href = "/admin/payments") : "";
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  const getPaymentMethods = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `payment_methods`
      );
      setPaymentMethods(results.data.data);
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

  useEffect(() => {
    getPaymentMethods();
    getOrders();
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Create Payment</h5>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="payment_method_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected="">Payment Method</option>
                    {paymentMethods?.map((obj) => {
                      return (
                        <option value={obj.payment_method_id}>
                          {obj.name}
                        </option>
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
                    Amont
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    name="amount"
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

export default CreatePayment;
