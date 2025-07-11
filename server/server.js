require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const { Pool } = require('pg');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const publier = require('./publier')
const crudserv = require('./crudserv')
const router = express.Router();
const JWT_SECRET = "monsupersecret";
const gesCompte = require('./gesCompte')

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', publier);
app.use('/api', crudserv);
app.use('/api', gesCompte);
app.use('/uploads', express.static('uploads'));
app.use('/UPLOAD', express.static(path.join(__dirname, 'UPLOAD')));


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PTU',
    password: 'merime2005',
    port: 5433,
});

app.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = userResult.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            alert('mot de passe incorrect')
            return res.status(401).json({ message: "Mot de passe incorrect" });

        }
        // creation du token
        const token = jwt.sign({
            id: user.id,
            nom: user.username,
            email: user.email

        }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Connexion réussie", token,


        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }

    console.log(req.body);
});





app.post('/signup', async (req, res) => {
    const { username, email, password, genre, numero } = req.body;
    try {
        const userExitts = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (userExitts.rows.length > 0) {
            return res.status(400).json({ message: "cet email est deja" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        if (!username || !email || !password || !genre || !numero) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }


        const result = await pool.query(
            'INSERT INTO users (username, email, password, numero, genre, date_) VALUES ($1, $2, $3, $4, $5, default) RETURNING id',
            [username, email, hashedPassword, numero, genre]
        );

        res.status(201).json({ message: 'Inscription réussie !', userId: result.rows[0].id });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Erreur du serveur.' });

    }


    console.log(req.body);

});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
module.exports = router;

