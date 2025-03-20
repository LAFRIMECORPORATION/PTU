import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profil.css";


const Profil = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(""); // URL de la photo de profil
  const [photoFile, setPhotoFile] = useState(null); // Fichier sélectionné

  useEffect(() => {
    // Récupère les données de profil depuis le backend
    axios.get("http://localhost:5000/api/profil")
      .then((res) => {
        setNom(res.data.nom);
        setEmail(res.data.email);
        setPhoto(res.data.photoURL); // Supposons que l'API renvoie l'URL de la photo
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Affiche un aperçu de l'image
      setPhotoFile(file); // Sauvegarde le fichier pour l'envoi
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Créer un FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("email", email);
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    axios.post("http://localhost:5000/api/profil", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => alert("Profil mis à jour"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="profil-section">
      <h2 className="h2">Modifier le Profil</h2>
      <div className="photo-profil">
        <img src={photo || "/images/default-avatar.png"} alt="Profil" />
        <input type="file" onChange={handlePhotoChange} />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label>Nom :</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default Profil;