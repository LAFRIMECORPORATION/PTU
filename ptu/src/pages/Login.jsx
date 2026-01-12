import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const Navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_APT_URL}/Login`, form);

            const token = res.data.token
            //stokage du token dans localstorage
            localStorage.setItem('token', token);
            localStorage.setItem('tokenTimestamp', Date.now().toString());
            //decoder le token, pour recuperer les infos utiles si besoin
            const decoded = jwtDecode(token)
            setIsAuthenticated(true);
            console.log('utilisateur connecte:', decoded)
            Navigate('/accueil');
        } catch (error) {
            console.log(error.response);
            alert(error.response?.data?.error || "identifiant incorect");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
