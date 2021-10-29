import express from 'express';
import sqlite from 'sqlite3';
import { dbName, tiltDataTableName } from '../constants';

const router = express.Router();
const db = new sqlite.Database(dbName);

router.get('/', (_, res) => {
    db.all(`SELECT beer_name, beer_slug FROM ${tiltDataTableName} GROUP BY beer_name`, (err: Error, rows) => {
        if (err) throw err;
        res.render('beers', { beers: rows });
    });
});

export default router;
