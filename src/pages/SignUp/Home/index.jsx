import { useState, useEffect } from 'react';
import axios from 'axios';
import "./home.css"

export function Home() {
  const [tickets, setTickets] = useState([]);

  // API'den biletleri almak için bir işlev
  const fetchTickets = async () => {
    try {
      const response = await axios.get('/api/v1/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  // Sayfa yüklendiğinde biletleri al
  useEffect(() => {
    fetchTickets();
  }, []);

  // Metni belirli bir uzunluktan sonra kesme işlevi
  const truncateText = (text) => {
    if (text.length <= 30) return text;
    return text.substring(0, 30) + '...';
  };

  const handleBuyTicket = (ticketId) => {
    // Satın alma işlemleri burada yapılabilir, örneğin ödeme sayfasına yönlendirme vb.
    console.log('Ticket ID:', ticketId);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Biletler</h2>
      <div className="row">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="col-md-4 mb-4">
            <div className="card ticket-card">
              <img src={ticket.image} className="card-img-top" alt="Ticket" />
              <div className="card-body">
                <h5 className="card-title">{ticket.name}</h5>
                <p className="card-text">{truncateText(ticket.description, 100)}</p>
                <p className="card-text">Tipi: {ticket.type}</p>
                <p className="card-text">Fiyat: {ticket.price}</p>
                <p className="card-text">Tarih: {ticket.ticketDate}</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleBuyTicket(ticket.id)}
                >
                  Satın Al
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
