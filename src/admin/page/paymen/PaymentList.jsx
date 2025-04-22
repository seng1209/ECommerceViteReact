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

  const [payments, setPayments] = useState([]);

  const getPayments = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `payments`,
        config
      );
      setPayments(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  const handleDeletePayment = async (payment_id) => {
    try {
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `payments/${payment_id}`,
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
            <th scope="col">Payment Date</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Order ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((obj) => {
            return (
              <tr>
                <td>{obj.payment_id}</td>
                <td>{obj.payment_date}</td>
                <td>{obj?.payment_method?.name}</td>
                <td>{obj.order_id}</td>
                <td>{obj.amount}</td>
                <td>{obj.status}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.payment_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDeletePayment(obj.payment_id)}
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
