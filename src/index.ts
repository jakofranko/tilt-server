import express from 'express';
import bodyParser from 'body-parser';
import sqlite from 'sqlite3';
import path from 'path';
import indexController from './controllers/index';
import beersController from './controllers/beers';
import tiltDataController from './controllers/tilt-data';
import { tiltDataTableDefinition } from './db';

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

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());
app.use('/', indexController);
app.use('/beers', beersController);
app.use('/tilt-data', tiltDataController);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Tilt Server listening at http://localhost:${port}`);
});
