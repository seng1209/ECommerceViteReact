import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BrandList = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [brands, setBrands] = useState([]);
  const getBrands = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `brands`,
        config
      );
      setBrands(results.data.data);
      //   console.log(results.data.data);
    } catch (error) {
      if (error.response) {
        console.log("Error Repsonse: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const handleDeleteBrand = async (brand_id, image_name) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_BASE + `delete-image/${image_name}`,
        config
      );
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `brands/${brand_id}`,
        config
      );
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Resopnse: " + error.response.data);
        console.log("Status Code: " + error.response.status);
      } else {
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Brand
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Brand</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((obj) => {
            return (
              <tr key={obj.brand_id}>
                <td>{obj.brand_id}</td>
                <td>
                  <img src={obj.image} alt={obj.image} width="200px" />
                </td>
                <td>{obj.brand}</td>
                <td>{obj.description}</td>
                <td className="d-flex">
                  <Link
                    to={`update/${obj.brand_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      handleDeleteBrand(obj.brand_id, obj.image_name)
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

export default BrandList;
