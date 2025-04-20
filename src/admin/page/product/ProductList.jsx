import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `products`
      );
      setProducts(results.data.data);
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteProduct = async (product_id, image_name) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_BASE + `delete-image/${image_name}`
      );
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `products/${product_id}`
      );
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Product
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((obj) => {
            return (
              <tr key={obj.product_id}>
                <td>{obj.product_id}</td>
                <td>
                  <img src={obj.image} alt={obj.image} width="200px" />
                </td>
                <td>{obj.product_name}</td>
                <td>${obj.price}</td>
                <td>{obj.brand.brand}</td>
                <td>{obj.category.category}</td>
                <td>{obj.description}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.product_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      handleDeleteProduct(obj.product_id, obj.image_name)
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

export default ProductList;
