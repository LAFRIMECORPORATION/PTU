import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Accueil from "./pages/accueil";
import APropos from "./pages/APropos";
import MonCompte from "./pages/MonCompte";
import NosOffres from "./pages/NosOffres";
import NousContacter from "./pages/NousContacter";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre la connexion

  return (
    <Router>
      <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
};

const Main = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Cacher la navbar sur les pages de connexion et d'inscription
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup";

  // Gérer la déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false); // Met l'état à "déconnecté"
    navigate("/accueil"); // Redirige vers l'accueil
  };

  return (
    <div>
      {/* Navbar visible uniquement après la connexion */}
      {showNavbar && (
        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Accueil</Link>
          <Link to="/a-propos" className={location.pathname === "/a-propos" ? "active-link" : ""}>A Propos</Link>
          <Link to="/mon-compte" className={location.pathname === "/mon-compte" ? "active-link" : ""}>Mon Compte</Link>
          <Link to="/nos-offres" className={location.pathname === "/nos-offres" ? "active-link" : ""}>Nos Offres</Link>
          <Link to="/nous-contacter" className={location.pathname === "/nous-contacter" ? "active-link" : ""}>Nous Contacter</Link>
          <Link to="/notification" className={location.pathname === "/notification" ? "active-link" : ""}>Notification</Link>

          {/* Afficher "Se connecter" et "S'inscrire" uniquement si l'utilisateur N'EST PAS connecté */}
          {!isLoggedIn && (
            <>
              <Link to="/login">Se connecter</Link>
              <Link to="/signup">S'inscrire</Link>
            </>
          )}

          {/* Afficher "Se déconnecter" uniquement si l'utilisateur EST connecté */}
          {isLoggedIn && <button onClick={handleLogout}>Se déconnecter</button>}
        </nav>
      )}

      {/* Gestion des routes */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/mon-compte" element={<MonCompte />} />
        <Route path="/nos-offres" element={<NosOffres />} />
        <Route path="/nous-contacter" element={<NousContacter />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;