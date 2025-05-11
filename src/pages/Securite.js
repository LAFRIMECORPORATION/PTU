import React, { useState } from "react";
import axios from "axios";
import "./Profil.css";

const Securite = () => {
  const [ancienMdp, setAncienMdp] = useState("");
  const [nouveauMdp, setNouveauMdp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/securite", { ancienMdp, nouveauMdp })
      .then((res) => alert("Mot de passe modifié"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="securite-section">
      <h2>Modifier le mot de passe</h2>
      <form onSubmit={handleSubmit}
        className="form">
        <label>Ancien mot de passe :</label>
        <input type="password" value={ancienMdp} onChange={(e) => setAncienMdp(e.target.value)} />
        <label>Nouveau mot de passe :</label>
        <input type="password" value={nouveauMdp} onChange={(e) => setNouveauMdp(e.target.value)} />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default Securite;
