const express = require("express");
const router = express.Router();
const multer = require('multer')

const { Pool } = require('pg')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PTU',
    password: 'merime2005',
    port: 5433,
});
router.post('/publier', upload.single('fichier'), async (req, res) => {
    const { titre, description, categorie } = req.body
    const fichier = req.file ? req.file.filename : null;
    console.log('BODY-', req.body)
    console.log('FILE-', req.file)
    try {
        if (!fichier) {
            return res.status(400).json({ message: ' fichier manquant.' })
        }
        await pool.query(
            'INSERT INTO projets (titre, description, categorie, fichier, date_publication)VALUES ($1, $2, $3, $4, default) RETURNING*', [titre, description, categorie, fichier]
        );
        res.status(201).json({ message: 'projet publié succes' });
    } catch (err) {
        console.error('erreur de publication :', err);
        res.status(500).json({ message: 'erreur lors de la pubication' })
    }
})
module.exports = router;