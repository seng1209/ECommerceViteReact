import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const results = await axios.get(import.meta.env.VITE_API_BASE + `orders`);
      setOrders(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteOrder = async (order_id) => {
    try {
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `orders/${order_id}`
      );
      result ? window.location.reload() : "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Order
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Order Date</th>
            <th scope="col">User</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((obj) => {
            return (
              <tr key={obj.user_id}>
                <td>{obj.order_id}</td>
                <td>{obj.order_date}</td>
                <td>{obj?.user.username}</td>
                <td>{obj.total_amount}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.order_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDeleteOrder(obj.order_id)}
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

export default OrderList;
