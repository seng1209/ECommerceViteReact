import { useState, useEffect } from "react";
import axios from "axios";

const CreateOrderProducts = () => {
  const [orderProduct, setOrderProduct] = useState([]);

  const [orders, setOrders] = useState([]);

  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    setOrderProduct({ ...orderProduct, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        import.meta.env.VITE_API_BASE + `order-details`,
        orderProduct
      );
      const order_id = result.data.data.order_id;
      const total_amount = await axios.get(
        import.meta.env.VITE_API_BASE + `order-details/total-amount/${order_id}`
      );
      const totalAmount = { total_amount: total_amount.data };
      await axios.put(
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
                    <option selected disabled>
                      Order ID
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
                    <option selected disabled>
                      Product
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

export default CreateOrderProducts;
