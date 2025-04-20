import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateShipmentMethod = () => {
  const { name } = useParams();

  const [shipmentMethod, setShipmentMethod] = useState([]);

  const [file, setFile] = useState();

  const formData = new FormData();
  formData.append("image", file);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setShipmentMethod({ ...shipmentMethod, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        const result = await axios.put(
          import.meta.env.VITE_API_BASE + `shipment_methods/${name}`,
          shipmentMethod
        );
        result ? (window.location.href = "/admin/shipment-methods") : "";
      } else {
        await axios.delete(
          import.meta.env.VITE_API_BASE +
            `delete-image/${shipmentMethod.image_name}`
        );
        const imageResponse = await axios.post(
          import.meta.env.VITE_API_BASE + `upload-image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const shipmentMethodDto = {
          ...shipmentMethod,
          image: imageResponse.data.link,
          image_name: imageResponse.data.filename,
        };
        const result = await axios.put(
          import.meta.env.VITE_API_BASE + `shipment_methods/${name}`,
          shipmentMethodDto
        );
        result ? (window.location.href = "/admin/shipment-methods") : "";
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

  const getShipmentMethod = async (name) => {
    try {
      const result = await axios.get(
        import.meta.env.VITE_API_BASE + `shipment_methods/${name}`
      );
      setShipmentMethod(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShipmentMethod(name);
  }, []);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Forms</h5>
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
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="name"
                    value={shipmentMethod.name}
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
                    value={shipmentMethod.price}
                    onChange={(e) => handleInputChange(e)}
                  />
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
                    value={shipmentMethod.description}
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

export default UpdateShipmentMethod;
