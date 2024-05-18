/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { loadLoginState } from "../state/storage";

// import { Input } from '../SignUp/components/Input';

export function Tickets() {
  const [newImage, setNewImage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    price: "",
    ticketDate: "", // Yeni eklenen ticketDate özelliği
    userId: loadLoginState()?.id,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otherType, setOtherType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, type: value });
    if (value === "Diğer") {
      setOtherType("");
    }
  };

  const onSelectImage = (event) => {
    if (event.target.files.length < 1) return;
    const files = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const data = fileReader.result;
      setNewImage(data);
    };

    fileReader.readAsDataURL(files);
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Bilet ismi boş bırakılamaz.";
    }
    if (!formData.description.trim()) {
      errors.description = "Bilet açıklaması boş bırakılamaz.";
    }
    if (!formData.type) {
      errors.type = "Bilet tipi seçilmelidir.";
    }
    if (!formData.price) {
      errors.price = "Bilet fiyatı belirtilmelidir.";
    }
    if (!formData.ticketDate) {
      // ticketDate boş olamaz kontrolü
      errors.ticketDate = "Bilet tarihi belirtilmelidir.";
    }
    if (!formData.userId) {
      errors.userId = "User ID belirtilmelidir.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = loadLoginState();
    if (!loginData || loginData.id === 0) {
      setErrorMessage("Bilet eklemek için giriş yapmalısınız.");
      return;
    }

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrorMessage("Formdaki bazı alanlar eksik veya hatalı.");
      return;
    }

    try {
      const formDataWithImage = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        price: formData.price,
        userId: formData.userId,
        image: newImage,
        ticketDate: formData.ticketDate, // ticketDate verisini formData'ya ekledik
      };

      const response = await axios.post("/api/v1/tickets", formDataWithImage, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Bilet başarıyla eklendi.");
      console.log("Ticket added successfully:", response.data);
    } catch (error) {
      console.error("Error adding ticket:", error.response?.data);
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container">
      {loadLoginState()?.id === 0 && (
        <div className="alert alert-danger" role="alert">
          Bilet eklemek için giriş yapmalısınız.
        </div>
      )}
      {loadLoginState()?.id !== 0 && (
        <>
          <h2>Bilet Oluştur</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">Bilet İsmi:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Bilet Açıklaması:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type">Bilet Tipi:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                className="form-select"
              >
                <option value="">Bir tip seçin</option>
                <option value="Tiyatro">Tiyatro</option>
                <option value="Konser">Konser</option>
                <option value="Stand-Up">Stand-Up</option>
                <option value="Yemek">Yemek</option>
                <option value="Diğer">Diğer</option>
              </select>
              {formData.type === "Diğer" && (
                <div className="mb-3">
                  <label htmlFor="otherType">Diğer:</label>
                  <input
                    type="text"
                    id="otherType"
                    name="otherType"
                    value={otherType}
                    onChange={(e) => setOtherType(e.target.value)}
                    className="form-control"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="price">Bilet Fiyatı:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ticketDate">Bilet Tarihi:</label>
              <input
                type="datetime-local"
                id="ticketDate"
                name="ticketDate"
                value={formData.ticketDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ticketImage" className="form-label">
                Etkinlik Görseli:
              </label>
              <div className="input-group">
                <input
                  type="file"
                  id="ticketImage"
                  name="ticketImage"
                  className="form-control"
                  onChange={onSelectImage}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Bilet Oluştur
              </button>
            </div>
          </form>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
        </>
      )}
    </div>
  );
}
