import React, { useState } from "react";
import Profil from "./Profil";
import Securite from "./Securite";
import Historique from "./Historique";
import "./MonCompt.css";



const MonCompte = () => {
  const [activeTab, setActiveTab] = useState("profil");





  const renderContent = () => {
    switch (activeTab) {
      case "profil":
        return <Profil />;
      case "securite":
        return <Securite />;
      case "historique":
        return <Historique />;
      default:
        return <Profil />;
    }
  };

  return (

    <div >
      <div className="mon-compte-container">



        <div className="content-container">
          <aside className="sidebar">


            <button onClick={() => setActiveTab("profil")} className={activeTab === "profil" ? "active" : ""}
            >
              Profil
            </button>
            <button onClick={() => setActiveTab("securite")} className={activeTab === "securite" ? "active" : ""}>
              Sécurité
            </button>
            <button onClick={() => setActiveTab("historique")} className={activeTab === "historique" ? "active" : ""}>
              Historique
            </button>

          </aside>
          <main className="main-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MonCompte;
