import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePayment = () => {
  const { payment_id } = useParams();

  const [payment, setPayment] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [orders, setOrders] = useState([]);

  const handleInputChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        import.meta.env.VITE_API_BASE + `payments/${payment_id}`,
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

  const getPayment = async (payment_id) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `payments/${payment_id}`
      );
      setPayment(result.data.data);
      //   console.log(result.data.data);
    } catch (error) {
      console.log(error);
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
    getPayment(payment_id);
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
                    <option
                      selected
                      disabled
                      value={payment?.payment_method?.payment_method_id}
                    >
                      {payment?.payment_method?.name}
                    </option>
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
                    <option selected disabled value={payment?.order_id}>
                      {payment?.order_id}
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
                    Amont
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    name="amount"
                    value={payment.amount}
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

export default UpdatePayment;
