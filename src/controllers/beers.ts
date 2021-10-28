import express from 'express';
import sqlite from 'sqlite3';

const router = express.Router();
const db = new sqlite.Database('tilt_data');

router.get('/', (_, res) => {
    db.all(`SELECT beer_name, beer_slug FROM tilt_data GROUP BY beer_name`, (err: Error, rows) => {
        if (err) throw err;
        res.render('beers', { beers: rows });
    });
});

export default router;
