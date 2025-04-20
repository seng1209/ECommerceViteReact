import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PaymentMethodList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const getPaymentMethods = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `payment_methods`
      );
      setPaymentMethods(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const handleDelete = async (name, image_name) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_BASE +
          `delete-image/${paymentMethodResponse.data.data.image_name}`
      );
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `payment_methods/${name}`
      );
      result ? window.location.reload() : "";
    } catch (error) {
      if (error.response) {
        console.log("Error Response: " + error.response.data);
        console.log("Status Code: " + error.response.stutus);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Payment Method
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods?.map((obj) => {
            return (
              <tr>
                <td>{obj.payment_method_id}</td>
                <td>
                  <img src={obj.image} alt={obj.image} width="200px" />
                </td>
                <td>{obj.name}</td>
                <td>{obj.price}</td>
                <td>{obj.description}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.name}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => handleDelete(obj.name, obj.image_name)}
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

export default PaymentMethodList;
