import express from 'express';
import bodyParser from 'body-parser';
import sqlite from 'sqlite3';
import { tiltDataTableDefinition, insertTiltData } from './db';
import { sanitizeTiltEvent } from './utils';

sqlite.verbose();

const app = express();
const port = 3000;
const tableName = 'tilt_data';
const db = new sqlite.Database(tableName);

// Check if tilt-data table exists
db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='{${tableName}}';`, (err: Error) => {
    // If the table doesn't exist, then create it
    if (err && err.message.match('no such column')) {
        db.run(tiltDataTableDefinition);
    }
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tilt-data', (req, res) => {
    db.all(`SELECT * FROM ${tableName}`, (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

app.post('/tilt-data', (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('Headers:', req.headers);
    // tslint:disable-next-line:no-console
    console.log('Body:', req.body);
    insertTiltData(sanitizeTiltEvent(req.body));
    res.send('Data recieved');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
