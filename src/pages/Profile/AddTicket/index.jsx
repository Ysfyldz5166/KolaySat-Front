import { useState, useEffect } from "react";
import axios from "axios";
import { loadLoginState } from "../../state/storage";
import "./AddTicket.css";

export function AddTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = loadLoginState()?.id;
        if (!userId) {
          throw new Error("User not logged in");
        }
        const response = await axios.get(`/api/v1/tickets/user/${userId}`);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketClick = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleCloseModal = () => {
    setEditingTicket(null);
    setIsEditing(false);
  };

  const handleEditTicket = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteTicket = async (ticket) => {
    try {
      await axios.delete(`/api/v1/tickets/${ticket.id}`);
      setTickets((prevTickets) => prevTickets.filter((t) => t.id !== ticket.id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setError("Bilet silinirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!editingTicket || !editingTicket.id) {
        throw new Error("Düzenlenen bilet bilgileri eksik.");
      }

      const updatedTicketData = {
        id: editingTicket.id,
        name: editingTicket.name,
        description: editingTicket.description,
        type: editingTicket.type.charAt(0).toUpperCase() + editingTicket.type.slice(1).toLowerCase(),
        price: editingTicket.price,
        ticketDate: editingTicket.ticketDate,
      };

      const response = await axios.put(`/api/v1/tickets/${editingTicket.id}`, updatedTicketData);

      setTickets((prevTickets) =>
        prevTickets.map((ticket) => (ticket.id === editingTicket.id ? response.data : ticket))
      );

      setEditingTicket(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Bilet güncellenirken bir hata oluştu:", error);
      setError("Bilet güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setEditingTicket((prevTicket) => ({
      ...prevTicket,
      type: value,
      otherType: value !== "diğer" ? "" : prevTicket.otherType,
    }));
  };

  const handleOtherTypeChange = (e) => {
    const value = e.target.value;
    setEditingTicket((prevTicket) => ({
      ...prevTicket,
      otherType: value,
    }));
  };

  return (
    <div className="container mt-4 profile-container">
      <h3 className="text-center mb-4">Eklenen Biletler</h3>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : tickets.length > 0 ? (
        <div className="row">
          {tickets.map((ticket) => (
            <div className="col-md-4 mb-4" key={ticket.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{ticket.name}</h5>
                  <p className="card-text">{ticket.description}</p>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Tipi:</strong> {ticket.type}
                    </li>
                    <li>
                      <strong>Fiyat:</strong> {ticket.price}
                    </li>
                    <li>
                      <strong>Tarih:</strong> {ticket.ticketDate}
                    </li>
                  </ul>
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => handleTicketClick(ticket)}
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Henüz eklenen bilet yok.</p>
      )}

      {editingTicket && <div className="modal-backdrop show"></div>}

      {editingTicket && (
        <div className="modal show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Bilet Düzenle</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">İsim</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editingTicket.name}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Açıklama</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={editingTicket.description}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Tipi</label>
                    {isEditing ? (
                      <select
                        className="form-control"
                        id="type"
                        name="type"
                        value={editingTicket.type}
                        onChange={handleTypeChange}
                      >
                        <option value="yemek">Yemek</option>
                        <option value="konser">Konser</option>
                        <option value="stand-up">Stand-Up</option>
                        <option value="tiyatro">Tiyatro</option>
                        <option value="diğer">Diğer</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={editingTicket.type}
                        readOnly
                      />
                    )}
                    {editingTicket.type === "diğer" && (
                      <div className="form-group">
                        <label htmlFor="otherType">Diğer</label>
                        <input
                          type="text"
                          className="form-control"
                          id="otherType"
                          name="otherType"
                          value={editingTicket.otherType}
                          onChange={handleOtherTypeChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Fiyat</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={editingTicket.price}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ticketDate">Tarih</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ticketDate"
                      name="ticketDate"
                      value={editingTicket.ticketDate}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                  {isEditing && (
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="btn btn-success mr-2"
                        onClick={handleSubmit}
                      >
                        Gönder
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mr-2"
                        onClick={handleCancelEdit}
                      >
                        İptal
                      </button>
                    </div>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                {!isEditing && (
                  <button
                    className="btn btn-warning mr-2"
                    onClick={handleEditTicket}
                  >
                    Düzenle
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTicket(editingTicket)}
                >
                  Sil
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
