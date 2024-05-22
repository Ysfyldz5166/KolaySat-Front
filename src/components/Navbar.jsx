import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../pages/state/context";
import {
  FaUser,
  FaTheaterMasks,
  FaTicketAlt,
  FaSignOutAlt,
  FaUtensils,
  FaMicrophone,
  FaMusic,
  FaUserPlus,
  FaSignInAlt,
  FaEllipsisH,
} from "react-icons/fa";

import "./navbar.css"

export function Navbar() {
  const { id, onLogotSuccess } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLinkClick = (newType) => {
    const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
    loginData.type = newType;
    localStorage.setItem("loginData", JSON.stringify(loginData));
    navigate("/");
    navigate(0);// Sayfayı yeniden yükle

  };

  const onClickLogout = () => {
    onLogotSuccess();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "lightgreen" }}
      >
        <Link className="navbar-brand" to="/"onClick={() => handleLinkClick("all")}>
          Kolay Sat
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav w-100">
            <Link
              className="nav-link"
              onClick={() => handleLinkClick("Yemek")}
            >
              <div>
                <FaUtensils />
              </div>
              <div>Yemek</div>
            </Link>
            <Link
              
              className="nav-link"
              onClick={() => handleLinkClick("Stand-Up")}
            >
              <div>
                <FaMicrophone />
              </div>
              <div>Stand-up</div>
            </Link>
            <Link
              to="/"
              className="nav-link"
              onClick={() => handleLinkClick("Konser")}
            >
              <div>
                <FaMusic />
              </div>
              <div>Konser</div>
            </Link>
            <Link
              to="/"
              className="nav-link"
              onClick={() => handleLinkClick("Tiyatro")}
            >
              <div>
                <FaTheaterMasks />
              </div>
              <div>Tiyatro</div>
            </Link>
            <Link
              to="/"
              className="nav-link"
              onClick={() => handleLinkClick("Diğer")}
            >
              <div>
                <FaEllipsisH />
              </div>
              <div>Diğer</div>
            </Link>
            <Link to="/ticket" className="nav-link">
              <div>
                <FaTicketAlt />
              </div>
              <div>Bilet Ekle</div>
            </Link>
            {id === 0 ? (
              <>
                <button className="btn btn-light mr-2">
                  <Link
                    to="/signup"
                    className="navbar-button"
                  >
                    <div>
                      <FaUserPlus />
                    </div>
                    <div>Kayıt Ol</div>
                  </Link>
                </button>
                <button className="btn btn-light navbar-button">
                  <Link
                    to="/login"
                    className="navbar-button"
                  >
                    <div>
                      <FaSignInAlt />
                    </div>
                    <div>Giriş Yap</div>
                  </Link>
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-light navbar-button">
                  <Link
                    to={`/profile/${id}`}
                    className="nav-link"
                  >
                    <div>
                      <FaUser />
                    </div>
                    <div>Profil</div>
                  </Link>
                </button>
                <button className="btn btn-light navbar-button">
                  <Link to="/" onClick={onClickLogout} className="nav-link">
                    <div>
                      <FaSignOutAlt />
                    </div>
                    <div>Çıkış Yap</div>
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
