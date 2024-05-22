/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { LoginContext } from "../pages/state/context";
import { useContext } from "react";
import { FaSignOutAlt, FaUser, FaTicketAlt, FaCog, FaHome } from "react-icons/fa";
import "./navbar.css"

export function NavbarProfil() {
  const loginState = useContext(LoginContext);

  const onClickLogout = () => {
    loginState.onLogotSuccess();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "lightgreen" }}>
        <div className="container-fluid">
          <Link className="navbar-brand ml-auto" to="/">
            Kolay Sat
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="row w-100">
              <div className="col-md-2 text-center">
                <Link className="nav-link" to="/">
                  <FaHome />
                  <div>Home</div>
                </Link>
              </div>
              <div className="col-md-2 text-center">
                <Link to={`/profile/${loginState.id}`} className="nav-link">
                  <FaUser />
                  <div>Profil</div>
                </Link>
              </div>
              <div className="col-md-2 text-center">
                <Link to="#" className="nav-link">
                  <FaTicketAlt />
                  <div>Satılan Biletler</div>
                </Link>
              </div>
              <div className="col-md-2 text-center">
                <Link to="#" className="nav-link">
                  <FaTicketAlt />
                  <div>Aldığım Biletler</div>
                </Link>
              </div>
              <div className="col-md-2 text-center">
                <Link to="#" className="nav-link">
                  <FaCog />
                  <div>Ayarlar</div>
                </Link>
              </div>
              <div className="col-md-2 text-center">
              <button className="btn btn-light navbar-button">
                  <Link to="/" onClick={onClickLogout} className="nav-link">
                    <div>
                      <FaSignOutAlt />
                    </div>
                    <div>Çıkış Yap</div>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
