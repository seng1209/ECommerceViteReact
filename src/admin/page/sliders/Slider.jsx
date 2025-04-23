import { useState, useEffect } from "react";
import axios from "axios";

const SliderManager = () => {
    const [sliders, setSliders] = useState([]);
    const [sliderData, setSliderData] = useState({ name: "", description: "" });
    const [file, setFile] = useState(null);
    const [editingSliderId, setEditingSliderId] = useState(null);

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/sliders");
            setSliders(response.data);
        } catch (error) {
            console.error("Error fetching sliders:", error);
        }
    };

    const handleInputChange = (e) => {
        setSliderData({ ...sliderData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCreateSlider = async (e) => {
        e.preventDefault();
        if (!file) return alert("Image is required.");

        try {
            const formData = new FormData();
            formData.append("name", sliderData.name);
            formData.append("description", sliderData.description);
            formData.append("image", file);

            const response = await axios.post("http://localhost:8000/api/v1/sliders", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSliders([...sliders, response.data]);
            resetForm();
            alert("Slider created successfully!");
        } catch (error) {
            console.error("Error creating slider:", error);
        }
    };

    const handleDeleteSlider = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/sliders/${id}`);
            setSliders(sliders.filter((slider) => slider.id !== id));
            alert("Slider deleted successfully!");
        } catch (error) {
            console.error("Error deleting slider:", error);
        }
    };

    const handleEditClick = (slider) => {
        setEditingSliderId(slider.id);
        setSliderData({ name: slider.name, description: slider.description });
        setFile(null); 
    };

    const handleUpdateSlider = async (e) => {
        e.preventDefault();
        if (!editingSliderId) return;

        try {
            const formData = new FormData();
            formData.append("name", sliderData.name);
            formData.append("description", sliderData.description);
            if (file) formData.append("image", file);

            const response = await axios.post(
                `http://localhost:8000/api/v1/sliders/${editingSliderId}?_method=PATCH`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setSliders(
                sliders.map((s) => (s.id === editingSliderId ? response.data : s))
            );
            resetForm();
            alert("Slider updated successfully!");
        } catch (error) {
            console.error("Error updating slider:", error);
        }
    };

    const resetForm = () => {
        setSliderData({ name: "", description: "" });
        setFile(null);
        setEditingSliderId(null);
    };

    return (
        <div className="container">
            <h2>Slider Manager</h2>

            <form onSubmit={editingSliderId ? handleUpdateSlider : handleCreateSlider}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" value={sliderData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label>Description:</label>
                    <textarea className="form-control" name="description" value={sliderData.description} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label>Image:</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingSliderId ? "Update Slider" : "Add Slider"}
                </button>
                {editingSliderId && (
                    <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                        Cancel
                    </button>
                )}
            </form>

            <h3 className="mt-4">Existing Sliders</h3>
            <div className="row">
                {sliders.map((slider) => (
                    <div className="col-md-4" key={slider.id}>
                        <div className="card mb-3">
                            <img src={`http://localhost:8000/${slider.image}`} className="card-img-top" alt={slider.name} />
                            <div className="card-body">
                                <h5 className="card-title">{slider.name}</h5>
                                <p className="card-text">{slider.description}</p>
                                <button className="btn btn-warning me-2" onClick={() => handleEditClick(slider)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteSlider(slider.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderManager;
