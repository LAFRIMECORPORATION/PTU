import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function Signup() {
    const [form, setForm] = useState({ username: "", genre: "", numero: "", confirmPassword: "", email: "", password: "" });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signup", form);


            if (response.status === 201) {
                alert('connexion reussite/');

                console.log('utilisateur connecte:')
                navigate('/login');
            }
        } catch (error) {
            alert(error.response?.data?.error || "Erreur lors de l'inscription");
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}
            >
                <div>
                    <label>Nom d'utilisateur :</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <label>
                    Numero de telephone :
                    <input
                        type="number"
                        name="numero"
                        value={form.numero}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Homme ou Femme :
                    <input
                        type="text"
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                    />
                </label>
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
                <label>
                    Confirmer le mot de passe :
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">S'inscrire</button>
                <p>deja un compte?  <Link to="/login"  >Se connecter
                </Link> </p>

            </form>
        </div>
    );
}

export default Signup;
