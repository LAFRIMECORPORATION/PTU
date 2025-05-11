import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { FaInfoCircle, FaUser, FaHome, FaUsers, FaPlusCircle } from 'react-icons/fa'
import Accueil from "./pages/accueil";
import APropos from "./pages/APropos";
import MonCompte from "./pages/MonCompte";

import Publier from "./pages/Publier";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './appp.css';

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


          <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Accueil <FaHome /> </Link>
          <Link to="/a-propos" className={location.pathname === "/a-propos" ? "active-link" : ""}>A Propos <FaInfoCircle /></Link>
          <Link to="/Publier" className={location.pathname === "/Publier" ? "active-link" : ""}><span> inover</span><FaPlusCircle /> </Link>
          <Link to="/mon-compte" className={location.pathname === "/mon-compte" ? "active-link" : ""}>Mon Compte <FaUser /></Link>


          <Link to="/notification" className={location.pathname === "/notification" ? "active-link" : ""}>Notification <FaUsers /></Link>

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

        <Route path="/publier" element={<Publier />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
      <nav className="nav-mob">


        <ul>

          <li><Link to="/" className={location.pathname === "/" ? "active-link" : ""}><FaHome /> <span>Accueil</span> </Link>
          </li>
          <li><Link to="/a-propos" className={location.pathname === "/a-propos" ? "active-link" : ""}><FaInfoCircle /><span>aPropos</span></Link>
          </li>
          <li><Link to="/Publier" className={location.pathname === "/Publier" ? "active" : ""}><FaPlusCircle /><span>inover
          </span> </Link>
          </li>
          <li><Link to="/mon-compte" className={location.pathname === "/mon-compte" ? "active-link" : ""}> <FaUser /><span> Compte</span> </Link>
          </li>
          <li> <Link to="/notification" className={location.pathname === "/notification" ? "active-link" : ""}> <FaUsers />
            <span>Notification</span></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;