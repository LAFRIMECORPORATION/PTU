import React, { useEffect, useState } from "react";
import axios from "axios";
import "./historique.css"

const Historique = () => {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const fetcProjets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/historique`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjets(res.data);
      } catch (err) {
        console.error('erreur lors du chargement des projets:', err)
      }
    };
    fetcProjets()

  }, []);

  return (
    <div className="mon-compte">
      <h2>Historique des projets</h2>
      {projets.length === 0 ? (
        <p> vous n avez publié aucun projet.</p>
      ) : (
        <div className="projets-liste">
          {projets.map((projet) => (
            <div key={projet.id} className="carte-projet" >
              <h3>{projet.titre} </h3>
              <p> {projet.categorie} </p>
              <i> {projet.description} </i>
              <p> Publié le {new Date(projet.date_publication).toLocaleDateString()} </p>
              {projet.fichier && (
                <img
                  src={`http://localhost:5000/uploads/${projet.fichier}`}
                  alt={projet.titre}
                  style={{ width: "100", maxHeight: '300px', objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Historique;

