import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateOrderProducts = () => {
  const { order_detail_id } = useParams();

  const [orderProduct, setOrderProduct] = useState([]);

  const [orders, setOrders] = useState([]);

  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    setOrderProduct({ ...orderProduct, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_BASE + `order-details/${order_detail_id}`,
        orderProduct
      );
      //   console.log(response.data.data);
      const order_id = response.data.data.order_id;
      const total_amount = await axios.get(
        import.meta.env.VITE_API_BASE + `order-details/total-amount/${order_id}`
      );
      const totalAmount = { total_amount: total_amount.data };
      const result = await axios.put(
        import.meta.env.VITE_API_BASE + `orders/${order_id}`,
        totalAmount
      );
      result ? (window.location.href = "/admin/order-products") : "";
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  const getOrderProduct = async (order_detail_id) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `order-details/${order_detail_id}`
      );
      setOrderProduct(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const results = await axios.get(import.meta.env.VITE_API_BASE + `orders`);
      setOrders(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `products`
      );
      setProducts(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    getProducts();
    getOrderProduct(order_detail_id);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Create Order Product</h5>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="order_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected disabled value={orderProduct.order_id}>
                      {orderProduct.order_id}
                    </option>
                    {orders?.map((obj) => {
                      return (
                        <option value={obj.order_id}>{obj.order_id}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="product_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option
                      selected
                      disabled
                      value={orderProduct?.product?.product_id}
                    >
                      {orderProduct?.product?.product_name}
                    </option>
                    {products?.map((obj) => {
                      return (
                        <option value={obj.product_id}>
                          {obj.product_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    name="quantity"
                    value={orderProduct.quantity}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Amount
                  </label>
                  <input
                    // disabled
                    type="number"
                    className="form-control"
                    name="amount"
                    value={orderProduct.amount}
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

export default UpdateOrderProducts;
