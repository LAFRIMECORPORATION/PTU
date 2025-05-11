const express = require("express");
const router = express.Router();



const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PTU',
    password: 'merime2005',
    port: 5433,
});
//create//
router.post('/crudserv', async (req, res) => {
    console.log("donnees recues:", req.body);
    const { username, email, password, genre, numero } = req.body;
    try {
        const newUser = await pool.query('INSERT INTO users (username, email, password, genre, numero, date_)VALUES ($1, $2, $3, $4, $5, default) RETURNING id', [username, email, password, genre, numero]);

        res.status(201).json({
            message: 'Inscription réussie !',
            userId: newUser.rows[0].id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//lire//
router.get('/crudserv', async (req, res) => {
    const users = await pool.query('SELECT*FROM users ORDER BY id DESC');
    res.json(users.rows);
});
//update
router.put('/crudserv/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password, genre, numero } = req.body;
    try {
        await pool.query('UPDATE users SET username=$1, email=$2, password=$3, genre=$4, numero=$5  WHERE id=$6', [username, email, password, genre, numero, id]);
        res.json({ message: ' UTILISATEUR MIS A JOUR' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});
//delete
router.delete('/crudserv/:id', async (req, res) => {
    await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    res.json({ message: 'utilisateur supprime' });
});
module.exports = router;