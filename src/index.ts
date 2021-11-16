import express from 'express';
import bodyParser from 'body-parser';
import sqlite from 'sqlite3';
import path from 'path';
import indexController from './controllers/index';
import beersController from './controllers/beers';
import tiltDataController from './controllers/tilt-data';
import uploadController from './controllers/upload';
import { tiltDataTableDefinition } from './db';
import { dbName, tiltDataTableName } from './constants';

sqlite.verbose();

const app = express();
const port = 3000;
const urlencodedParser = bodyParser.urlencoded();

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexController);
app.use('/beers', beersController);
app.use('/tilt-data', urlencodedParser, tiltDataController);
app.use('/upload', uploadController);

const db = new sqlite.Database(dbName, (err: Error) => {
    if (err) throw err;
    console.log('Connected to sqlite');
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Tilt Server listening at http://localhost:${port}`);
    });
});

// If the tilt_data table hasn't been created, create it.
db.run(tiltDataTableDefinition, (tableCreationError: Error) => {
    if (tableCreationError) throw tableCreationError;
});
