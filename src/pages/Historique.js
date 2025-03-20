import React, { useEffect, useState } from "react";
import axios from "axios";

const Historique = () => {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/historique")
      .then((res) => setProjets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="historique-section">
      <h2>Historique des projets</h2>
      <ul>
        {projets.map((projet) => (
          <li key={projet.id}>{projet.titre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Historique;

