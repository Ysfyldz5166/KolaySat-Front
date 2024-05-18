import { useContext } from "react";
import { Link } from "react-router-dom";
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
  FaSignInAlt
} from "react-icons/fa";
import "./navbar.css";

export function Navbar() {
  const loginState = useContext(LoginContext);

  const onClickLogout = () => {
    loginState.onLogotSuccess();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "lightgreen" }}
      >
        <Link className="navbar-brand" to="/home">
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
          <div className="row w-100">
            <div className="col-md-2 text-center">
              <Link className="nav-link" to="/home">
                <div><FaUtensils /></div>
                <div>Yemek</div>
              </Link>
            </div>
            <div className="col-md-2 text-center">
              <Link to={`/profile/${loginState.id}`} className="nav-link">
                <div><FaMicrophone /></div>
                <div>Stand-up</div>
              </Link>
            </div>
            <div className="col-md-2 text-center">
              <Link to="/home" className="nav-link">
                <div><FaMusic /></div>
                <div>Konser</div>
              </Link>
            </div>
            <div className="col-md-2 text-center">
              <Link to="#" className="nav-link">
                <div><FaTheaterMasks /></div>
                <div>Tiyatro</div>
              </Link>
            </div>
            <div className="col-md-2 text-center">
              <Link to="/ticket" className="nav-link">
                <div><FaTicketAlt /></div>
                <div>Bilet Ekle</div>
              </Link>
            </div>
            <div className="col-md-2 text-center">
              {loginState && loginState.id === 0 ? (
                <>
                  <button className="btn btn-light mr-2">
                    <Link to="/signup" className="navbar-button">
                      <div><FaUserPlus /></div>
                      <div>Kayıt Ol</div>
                    </Link>
                  </button>
                  <button className="btn btn-light">
                    <Link to="/login" className="navbar-button">
                      <div><FaSignInAlt /></div>
                      <div>Giriş Yap</div>
                    </Link>
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-light">
                    <Link
                      to={`/profile/${loginState.id}`}
                      className="navbar-button"
                    >
                      <div><FaUser /></div>
                      <div>Profil</div>
                    </Link>
                  </button>
                  <button className="btn btn-light">
                    <Link
                      to="/home"
                      onClick={onClickLogout}
                      className="navbar-button"
                    >
                      <div><FaSignOutAlt /></div>
                      <div>Çıkış Yap</div>
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
