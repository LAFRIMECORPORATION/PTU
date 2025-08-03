const express = require('express')
const router = express.Router();
const { Pool } = require('pg')
const authenticateToken = require('./auth')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PTU',
    password: 'merime2005',
    port: 5433,
});
router.get('/historique', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id // id extrait du token
        const result = await pool.query(
            'SELECT *FROM projets WHERE user_id = $1 ORDER BY date_publication DESC', [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('erreur lors de la recuperation des projets:', error)
        res.status(500).json
            ({ message: 'erreur serveur' })
    };

})
module.exports = router;