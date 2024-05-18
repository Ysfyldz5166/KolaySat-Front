import { LoginationContext } from "./pages/state/context";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { NavbarProfil } from "./components/NavbarProfil";
function App() {

  const location = useLocation();

  // Profil sayfasında mı kontrolü
  const isProfilePage = location.pathname.includes("/profile");

  
  return (
    <LoginationContext>
      {/* <Navbar/> */}
      {isProfilePage ? <NavbarProfil /> : <Navbar />}
      <div className="container mt-3">
        <Outlet/>
      </div>
      <Footer/>
    </LoginationContext>
  );
}

export default App;
