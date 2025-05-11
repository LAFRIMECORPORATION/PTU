import React, { useState } from "react";
import axios from "axios";
import './Publier.css';

function Publier() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategorie] = useState('');
    const [fichier, setFichier] = useState(null);
    const handleFileChange
        = (e) => {
            const file = e.target.files[0];
            if (file) {
                setFichier(file);
                setPreview(URL.createObjectURL(file));
            };
        }
    const [preview, setPreview] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('categorie', categorie);
        formData.append('fichier', fichier);
        try {
            await axios.post('http://localhost:5000/api/publier', formData,
                {
                    headers: { 'content-type': 'multipart/form-data' },
                });
            alert("projet publié avec succes");
            setTitre('');
            setDescription('');
            setCategorie('');
            setFichier(null);
        } catch (error) {
            console.error(error);
            alert("erreur lors de la publication");

        }
    };
    return (
        <div className="publier-container">
            <h2>publier un projet</h2>
            <form onSubmit={handleSubmit}
                className="publier-form">
                <input
                    type="text"
                    placecholder="titre du projet"
                    onChange={(e) => setTitre(e.target.value)} required />
                <textarea
                    placecholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} required />
                <input
                    type="text"
                    placecholder="categorie"
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)} required />
                <input
                    type="file"
                    onChange={handleFileChange} required />
                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="apercu du fichier" />
                    </div>
                )};
                <button type="submit">publier</button>
            </form>
        </div>

    );




};

export default Publier;
