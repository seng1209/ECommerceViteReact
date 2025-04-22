import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { product_id } = useParams();

  const [product, setProduct] = useState([]);

  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([]);

  const getProduct = async (product_id) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `products/${product_id}`,
        config
      );
      setProduct(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const getBrands = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `brands`,
        config
      );
      setBrands(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct(product_id);
    getBrands();
    getCategories();
  }, []);

  const [file, setFile] = useState();

  const formData = new FormData();
  formData.append("image", file);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        const result = await axios.put(
          import.meta.env.VITE_API_BASE + `products/${product_id}`,
          product,
          config
        );
        if (result) {
          window.location.href = "/admin/products";
        }
      } else {
        await axios.delete(
          import.meta.env.VITE_API_BASE + `delete-image/${product.image_name}`,
          config
        );
        const imageResponse = await axios.post(
          import.meta.env.VITE_API_BASE + `upload-image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
          config
        );
        const productDto = {
          ...product,
          image: imageResponse.data.link,
          image_name: imageResponse.data.filename,
        };
        const result = await axios.put(
          import.meta.env.VITE_API_BASE + `products/${product_id}`,
          productDto,
          config
        );
        if (result) {
          window.location.href = "/admin/products";
        }
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
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Product</h5>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="product_name"
                    value={product.product_name}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    step="any"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="my-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="brand_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected disabled value={product?.brand?.brand_id}>
                      {product?.brand?.brand}
                    </option>
                    {brands?.map((obj) => {
                      return <option value={obj.brand_id}>{obj.brand}</option>;
                    })}
                  </select>
                </div>
                <div className="my-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="category_id"
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option
                      selected
                      disabled
                      value={product?.category?.category_id}
                    >
                      {product?.category?.category}
                    </option>
                    {categories?.map((obj) => {
                      return (
                        <option value={obj.category_id}>{obj.category}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    defaultValue={""}
                    name="description"
                    value={product.description}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
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

export default UpdateProduct;
