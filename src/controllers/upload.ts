import express from 'express';
import formidable from 'formidable';
import csv from 'csv-parser';
import { Beer, TiltEvent, TiltDataRow } from '../types';
import { insertMultipleTiltData } from '../db';

const router = express.Router();

router.get('/', (_, res) => {
    res.render('upload', { title: 'Upload Tilt Data' });
});

router.post('/', (req, res, next) => {
    console.log('hit the upload controller');
    const csvData: TiltDataRow[] = [];
    const csvParserStream = csv()
        .on('data', (data) => {
            csvData.push(data);
        })
        .on('finish', () => {
            console.log('closed, inserting data');
            console.log(csvData);
            insertMultipleTiltData(csvData, () => {
                res.status(201).redirect('/beers');
            });
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
    });
})

export default router;
