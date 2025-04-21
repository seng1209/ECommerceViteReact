import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `categories`,
        config
      );
      setCategories(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDeleteCategory = async (category_id, image_name) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_BASE + `delete-image/${image_name}`
      );
      const result = await axios.delete(
        import.meta.env.VITE_API_BASE + `categories/${category_id}`
      );
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Link to="create" className="btn btn-primary m-1">
        Create new Category
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((obj) => {
            return (
              <tr key={obj.category_id}>
                <th>{obj.category_id}</th>
                <th>
                  <img src={obj.image} alt={obj.image} width="200px" />
                </th>
                <th>{obj.category}</th>
                <th>{obj.description}</th>
                <th className="d-flex">
                  <Link
                    to={`update/${obj.category_id}`}
                    className="btn btn-warning m-1"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      handleDeleteCategory(obj.category_id, obj.image_name)
                    }
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
