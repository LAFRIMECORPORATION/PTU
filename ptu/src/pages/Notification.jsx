import React, { useEffect, useState } from 'react';
import './crud.css';
import axios from 'axios';

const Notification = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        genre: '',
        numero: '',
    });

    const fetchUtilisateurs = async () => {
        const res = await axios.get('http://localhost:5000/api/crudserv');
        setUtilisateurs(res.data);
    };

    useEffect(() => {
        fetchUtilisateurs();
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (editIndex !== null) {
            await axios.put(`http://localhost:5000/api/crudserv/${utilisateurs[editIndex].id}`, formData);
        } else {
            await axios.post('http://localhost:5000/api/crudserv', formData);
        }
        fetchUtilisateurs();
        setFormData({ username: '', email: '', password: '', genre: '', numero: '' });
        setEditIndex(null);
    };

    const handleDelete = async id => {
        await axios.delete(`http://localhost:5000/api/crudserv/${id}`);
        fetchUtilisateurs();
    };

    const handleEdit = index => {
        setEditIndex(index);
        setFormData(utilisateurs[index]);
    };

    return (
        <div className="crud-container">
            <h2>Gestion des utilisateurs</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input name="username" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
                <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
                <input name="numero" placeholder="Numéro" value={formData.numero} onChange={handleChange} required />
                <button type="submit">{editIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
            </form>
            <ul className="user-list">
                {utilisateurs.map((u, i) => (
                    <li key={u.id} className="user-item">
                        <span>{u.username} | {u.email} | {u.genre} | {u.numero}</span>
                        <div>
                            <button onClick={() => handleEdit(i)}>Modifier</button>
                            <button onClick={() => handleDelete(u.id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;