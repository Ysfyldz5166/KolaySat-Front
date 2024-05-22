import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadLoginState } from "../../state/storage";
import "./buy.css";

export function Buy() {
  const { id } = useParams(); // URL'den bilet id'sini alın
  const [ticket, setTicket] = useState(null);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Bilet bilgilerini API'den al
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/api/v1/tickets/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    // Oturum açmış kullanıcının kimliğini al
    const userId = loadLoginState()?.id;

    // Kullanıcının tüm kartlarını API'den al
    const fetchUserCards = async () => {
      try {
        const response = await axios.get(`/api/v1/card/user/${userId}`
      );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching user cards:", error);
        setCards([]); // Hata durumunda cards'i boş bir dizi olarak ayarla
      }
    };

    fetchTicket();
    fetchUserCards(); // Kullanıcının kartlarını almak için userId kullan
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [id]: value,
    }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const userId = loadLoginState()?.id;
      const response = await axios.post("/api/v1/card", {
        ...newCard,
        user: { id: userId },
      });
      setCards((prevCards) => [...prevCards, response.data]);
      setNewCard({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      });
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  const handleBuyTicket = () => {
    // Bilet alma işlemini burada gerçekleştirin
    console.log("Bilet alındı!");
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      {loadLoginState()?.id === 0 ? (
        <div className="alert alert-danger" role="alert">
          Bilet almak için giriş yapmalısınız.
        </div>
      ) : (
        <div className="row">
          {/* Sol tarafta bilet bilgileri */}
          <div className="col-md-6">
            <div className="card">
              <img src={ticket.image} className="card-img-top" alt="Ticket" />
              <div className="card-body">
                <h5 className="card-title">{ticket.name}</h5>
                <p className="card-text">{ticket.description}</p>
                <p className="card-text">Tipi: {ticket.type}</p>
                <p className="card-text">Fiyat: {ticket.price}</p>
                <p className="card-text">Tarih: {ticket.ticketDate}</p>
              </div>
            </div>
          </div>

          {/* Sağ tarafta kart bilgilerini alma alanı */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Ödeme Bilgileri</h5>
                {cards.length === 0 ? (
                  <div>
                    <p>Henüz kart eklenmemiş. Lütfen kart bilgilerinizi ekleyin.</p>
                    <form onSubmit={handleAddCard}>
                      <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">
                          Kart Numarası
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={newCard.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cardName" className="form-label">
                          Kart Üzerindeki İsim
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardName"
                          placeholder="Ad Soyad"
                          value={newCard.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label">
                          Son Kullanma Tarihi
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="expiryDate"
                          placeholder="AA/YY"
                          value={newCard.expiryDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          placeholder="123"
                          value={newCard.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Kart Ekle
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <h6>Kayıtlı Kartlar</h6>
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`mb-3 border border-dark p-3 ${
                          selectedCard === card.id ? "clicked" : ""
                        }`}
                        onClick={() => handleCardClick(card.id)}
                      >
                        <p>
                          Kart Numarası:{" "}
                          {card.cardNumber.substring(0, 3) +
                            "*".repeat(card.cardNumber.length - 6) +
                            card.cardNumber.substring(card.cardNumber.length - 3)}
                        </p>
                        <p>Kart Üzerindeki İsim: {card.cardName}</p>
                      </div>
                    ))}
                    {selectedCard && (
                      <button
                        className="btn btn-success mt-3"
                        onClick={handleBuyTicket}
                      >
                        Bileti Al
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}