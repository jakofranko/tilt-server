import sqlite from 'sqlite3';
import type { Beer, TiltDataRow } from './types';
import { dbName, tiltDataTableName } from './constants';
import { sanitizeCsvRow } from './utils';

sqlite.verbose();
const db = new sqlite.Database(dbName);

export const tiltDataTableDefinition: string = `CREATE TABLE IF NOT EXISTS ${tiltDataTableName} (
    beer_name TEXT,
    beer_slug TEXT,
    temp REAL,
    sg REAL,
    color TEXT,
    comment TEXT,
    timepoint REAL,
    timestamp TEXT
)`;

export const insertStatement = `INSERT INTO ${tiltDataTableName} (beer_name, beer_slug, temp, sg, color, comment, timepoint, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

export function insertTiltData(beerData: Beer) {
    const {
        beer,
        slug,
        temp,
        sg,
        color,
        comment,
        timepoint
    } = beerData;

    db.run(insertStatement, [beer, slug, temp, sg, color, comment, timepoint, new Date()], function(err) {
        if (err) {
            throw err;
        }

        console.log('Insert successful', this.lastID);
    });
}

export function insertMultipleTiltData(beerData: TiltDataRow[], finalizeCallback?: any) {
    db.serialize(() => {
        const insert = db.prepare(insertStatement);

        beerData.forEach(dataEntry => {
            const {
                beer,
                slug,
                temp,
                sg,
                color,
                comment,
                timepoint,
                timestamp
            } = sanitizeCsvRow(dataEntry);
            console.log(timepoint);
            console.log(new Date(timepoint));

            insert.run([beer, slug, temp, sg, color, comment, timepoint, timestamp], (err) => {
                if (err) throw err;
            });
        });

        insert.finalize(finalizeCallback);
    });
}
