import express from 'express';
import sqlite from 'sqlite3';
import { insertTiltData } from '../db';
import { sanitizeTiltEvent } from '../utils';

const tableName = 'tilt_data';
const db = new sqlite.Database(tableName);
const router = express.Router();

router.get('/', (_, res) => {
    db.all(`SELECT * FROM ${tableName}`, (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

router.get('/:beerSlug', (req, res) => {
    const { beerSlug } = req.params;

    db.all(`SELECT * FROM ${tableName} WHERE beer_slug = ?;`, beerSlug, (err, rows) => {
        let beerName;
        if (err) throw err;
        if (!err && rows.length)
            beerName = rows[0].beer_name;

        res.render('index', { title: `${beerName} Tilt Data`, data: rows });
    });
})

router.post('/', (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('Headers:', req.headers);
    // tslint:disable-next-line:no-console
    console.log('Body:', req.body);
    insertTiltData(sanitizeTiltEvent(req.body));
    res.send('Data recieved');
});

export default router;
