/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import { FaCamera } from 'react-icons/fa'
import "./Profil.css";
import { useNavigate } from "react-router-dom";


const Profil = () => {
  const navigate = useNavigate();
  const [userId, setuserId] = useState(null);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState('null');
  const [photoUrl, setPhotoUrl] = useState('');
  const handleLogout = () => {

    //supprrimer le token
    localStorage.removeItem('token')
    //rediriger
    navigate('/signup')

  }

  //recuperer les données existant de l utilisateur
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setuserId(decoded.id);

      axios.get(`http://localhost:5000/api/users/${decoded.id}`)
        .then((res) => {
          setNom(res.data.username)
          setEmail(res.data.email)
          if (res.data.photo_profil) {
            setPhotoUrl(`http://localhost:5000/UPLOAD/${res.data.photo_profil} `)
          }
        })
        .catch((err) => console.error(err))

    }



  }, []);
  //en cas de chargement des modifications
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
  };
  //enregistrement des modifications
  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('email', email);
    if (photo) {
      formData.append('photo', photo)
    }
    try {

      await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      alert('mise a jour reussie')
    } catch (error) {
      console.error('erreur lors de la mise a jour', error);
    }

  };
  return (
    <div className="mon-compte">

      <form>
        <h2>Mon profil</h2>
        <div className="photo-wrapper">

          <div className="photo-cercle">
            <img src={photoUrl || '/default-avatar'} className="profile-pic" />
          </div>
          <label for="photo" className="icon-overlay"> <FaCamera /> </label>

          <div>

            <input type="file" id='photo' style={{ display: 'none' }} onChange={handlePhotoChange} accept="image/*" />
          </div>
        </div>
        <div>
          <label>nom</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <label>email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={handleSave}>enregistrer</button>
        <br />
        <br />
        <button onClick={handleLogout} className='dec'>se deconnecter</button>
      </form>
    </div>
  )
};

export default Profil;