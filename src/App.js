/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { FaInfoCircle, FaUser, FaHome, FaUsers, FaPlusCircle } from 'react-icons/fa'
import Accueil from "./pages/accueil";
import APropos from "./pages/APropos";
import MonCompte from "./pages/MonCompte";
import { jwtDecode } from 'jwt-decode';
import Publier from "./pages/Publier";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './appp.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false)


  // État pour suivre la connexion

  useEffect(() => {
    const token = localStorage.getItem('token');
    const timestamps = localStorage.getItem('tokenTimestamp')
    if (token && timestamps) {
      try {
        const now = Date.now();
        const decoded = jwtDecode(token)(now - parseInt(timestamps, 10)) / (1000 * 60)


        if (decoded.exp < 30) {

          setIsAuthenticated(true);
          setTokenExpired(false)

        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenTimestamp')
          setIsAuthenticated(false)
          setTokenExpired(true)
        }
      } catch (error) {
        console.error('token invalide');
        localStorage.removeItem('token');
        setIsAuthenticated(false)
      }

    } else {
      setIsAuthenticated(false)
    }
    setCheckingAuth(false)

  }, []);
  if (checkingAuth) return null;
  return (
    <Router>
      <MainRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
        tokenExpired={tokenExpired}
        setTokenExpired={setTokenExpired} />
    </Router>
  );

};

const MainRoutes = ({ isAuthenticated, setIsAuthenticated, tokenExpired }) => {
  const location = useLocation();
  const showNavbar = isAuthenticated;
  const hideNavbar = location.pathname === '/signup' || location.pathname === '/login'
  const MyNavbar = () => (
    <div>
      <nav className="nav">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Accueil <FaHome /> </Link>
        <Link to="/a-propos" className={location.pathname === "/a-propos" ? "active-link" : ""}>A Propos <FaInfoCircle /></Link>
        <Link to="/Publier" className={location.pathname === "/Publier" ? "active-link" : ""}><span> inover</span><FaPlusCircle /> </Link>
        <Link to="/mon-compte" className={location.pathname === "/mon-compte" ? "active-link" : ""}>Mon Compte <FaUser /></Link>
        <Link to="/notification" className={location.pathname === "/notification" ? "active-link" : ""}>Notification <FaUsers /></Link>
      </nav>
      <nav className="nav-mob">
        <Link to="/" className={location.pathname === "/" ? "active-link" : "lan"}> <FaHome /> <span>Accueil </span> </Link>
        <Link to="/a-propos" className={location.pathname === "/a-propos" ? "active-link" : "lan"}><FaInfoCircle /><span> APROPOS </span> </Link>
        <Link to="/Publier" className={location.pathname === "/Publier" ? "active-link" : "lan"}><FaPlusCircle /> <span> inover</span></Link>
        <Link to="/mon-compte" className={location.pathname === "/mon-compte" ? "active-link" : "lan"}> <FaUser /><span>COMPTE </span></Link>
        <Link to="/notification" className={location.pathname === "/notification" ? "active-link" : "lan"}><FaUsers /><span>NOTIFICATION </span> </Link>
      </nav>



    </div>



  )

  // Cacher la navbar sur les pages de connexion et d'inscription

  return (
    <>
      {!hideNavbar && showNavbar && <MyNavbar />}

      <Routes>
        {/* rediriger les utilisateurs non connecté vers signup*/}


        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup setIsAuthenticated={setIsAuthenticated} />) : (
              <Navigate to="/accueil" />
            )}


        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/accueil" />
            )
          }
        />
        <Route path="/" element={isAuthenticated ? <Accueil /> : tokenExpired ? <Navigate to="/login" /> : <Navigate to="/signup" />} />


        {/*routes protegees */}
        {isAuthenticated ? (
          <>
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/mon-compte" element={<MonCompte />} />
            <Route path="/publier" element={<Publier />} />
            <Route path="/notification" element={<Notification />} />
          </>
        ) : (
          <>
            <Route path="/accueil" element={<Navigate to="/signup" />} />
            <Route path="/a-propos" element={<Navigate to="/signup" />} />
            <Route path="/mon-compte" element={<Navigate to="/signup" />} />
            <Route path="/publier" element={<Navigate to="/signup" />} />
            <Route path="/notification" element={<Navigate to="/signup" />} />
          </>

        )}

      </Routes>
    </>
  );


};


export default App;