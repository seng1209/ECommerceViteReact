import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderProductsList = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [orderProducts, setOrderProducts] = useState([]);

  const getOrderProducts = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `order-details`,
        config
      );
      setOrderProducts(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderProducts();
  }, []);

  const handleDeleteOrderProduct = async (order_detail_id) => {
    try {
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `order-details/${order_detail_id}`,
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
        Create new Order Product
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Order ID</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts?.map((obj) => {
            return (
              <tr key={obj.order_detail_id}>
                <td>{obj.order_detail_id}</td>
                <td>{obj.order_id}</td>
                <td>{obj?.product?.product_name}</td>
                <td>{obj.quantity}</td>
                <td>{obj.amount}</td>
                <td>
                  <Link
                    to={`update/${obj.order_detail_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      handleDeleteOrderProduct(obj.order_detail_id)
                    }
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

export default OrderProductsList;
