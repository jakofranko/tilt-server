import express from 'express';
import sqlite from 'sqlite3';
import { insertTiltData } from '../db';
import { sanitizeTiltEvent } from '../utils';

const tableName = 'tilt_data';
const db = new sqlite.Database(tableName);
const router = express.Router();

router.get('/', (req, res) => {
    db.all(`SELECT * FROM ${tableName}`, (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

router.post('/', (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('Headers:', req.headers);
    // tslint:disable-next-line:no-console
    console.log('Body:', req.body);
    insertTiltData(sanitizeTiltEvent(req.body));
    res.send('Data recieved');
});

export default router;
