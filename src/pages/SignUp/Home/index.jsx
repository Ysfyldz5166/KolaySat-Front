/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./home.css"
import {useNavigate } from "react-router-dom";


export function Home() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate(); // useNavigate fonksiyonunu ekleyin

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/api/v1/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filterTickets = () => {
    const type = JSON.parse(localStorage.getItem('loginData'))?.type || 'all';
    const currentDate = new Date();
    
    let filteredByType = tickets;
    if (type !== 'all') {
      filteredByType = tickets.filter(ticket => ticket.type === type);
    }

    const filteredByDate = filteredByType.filter(ticket => new Date(ticket.ticketDate) > currentDate);

    setFilteredTickets(filteredByDate);
  };

  useEffect(() => {
    filterTickets();

    const timeoutId = setTimeout(() => {
      const loginData = JSON.parse(localStorage.getItem('loginData')) || {};
      loginData.type = 'all';
      localStorage.setItem('loginData', JSON.stringify(loginData));
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [tickets]);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  const handleBuyTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`); 
  };

  return (
    <div className="container">
      <h2 className="mb-4">Biletler</h2>
      <div className="row">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="col-md-4 mb-4">
            <div className="card ticket-card">
              <img src={ticket.image} className="card-img-top" alt="Ticket" />
              <div className="card-body">
                <h5 className="card-title">{ticket.name}</h5>
                <p className="card-text">{truncateText(ticket.description, 30)}</p>
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
