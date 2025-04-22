import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateBrand = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { brand_id } = useParams();
  const [brand, setBrand] = useState([]);

  const [file, setFile] = useState();

  const getBeand = async () => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `brands/${brand_id}`,
        config
      );
      setBrand(result.data.data);
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
    getBeand();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("image", file);

  const handleInputChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        const result = await axios.put(
          import.meta.env.VITE_API_BASE + `brands/${brand_id}`,
          brand,
          config
        );
        if (result) {
          window.location.href = "/admin/brands";
        }
      } else {
        await axios.delete(
          import.meta.env.VITE_API_BASE + `delete-image/${brand.image_name}`,
          config
        );
        const imageResopnse = await axios.post(
          import.meta.env.VITE_API_BASE + `upload-image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
          config
        );
        const brandDto = {
          ...brand,
          image: imageResopnse.data.link,
          image_name: imageResopnse.data.filename,
        };
        const result = await axios.put(
          import.meta.env.VITE_API_BASE + `brands/${brand_id}`,
          brandDto,
          config
        );
        if (result) {
          window.location.href = "/admin/brands";
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
          <h5 className="card-title fw-semibold mb-4">Create Brand</h5>
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
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="brand"
                    value={brand.brand}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {/* <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div> */}
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
                    value={brand.description}
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

export default CreateBrand;
