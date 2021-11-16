import express from 'express';
import formidable from 'formidable';
import { Duplex } from 'stream';
import csv from 'csv-parser';
import sqlite from 'sqlite3';
import { dbName, tiltDataTableName } from '../constants';

const router = express.Router();
const db = new sqlite.Database(dbName);

router.get('/', (_, res) => {
    res.render('upload');
});

router.post('/', (req, res, next) => {
    console.log('hit the upload controller');
    const csvData: string[] = [];
    const csvParserStream = csv()
        .on('data', (data) => {
            csvData.push(data);
        })
        .on('finish', () => {
            console.log('closed');
            console.log(csvData);
            // parse the contents of csvContents, and then store it in the DB
        });

    const form = formidable({
        fileWriteStreamHandler: (/* file */) => csvParserStream
    });
    console.log('parsing form');
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        const beerName = fields['beer-name'];
        res.json({ fields, files });
    });
})

export default router;
