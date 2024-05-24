/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { loadLoginState } from "../../state/storage";

export function BuyTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = loadLoginState()?.id;
        if (!userId) {
          throw new Error("User not logged in");
        }
        const response = await axios.get(`/api/v1/tickets/user/${userId}`);
        // Filtreleme işlemi: buyer alanı localStorage'deki kullanıcı ile aynı olan biletler
        const filteredTickets = response.data.filter(ticket => ticket.buyer === userId);
        setTickets(filteredTickets);
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

  return (
    <div className="container mt-4 profile-container">
      <h3 className="text-center mb-4">Satın Alınan Biletler</h3>
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
        <p className="text-center">Henüz satın alınan bilet yok.</p>
      )}
    </div>
  );
}
