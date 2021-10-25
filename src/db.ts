import sqlite from 'sqlite3';
import type { Beer } from './types';

sqlite.verbose();

const tableName = 'tilt_data';
const db = new sqlite.Database(tableName);

export const tiltDataTableDefinition: string = `CREATE TABLE ${tableName} (
    beer_name TEXT,
    temp REAL,
    sg REAL,
    color TEXT,
    comment TEXT,
    timepoint REAL
)`;

export function insertTiltData(beerData: Beer) {
    const {
        beer,
        temp,
        sg,
        color,
        comment,
        timepoint
    } = beerData;

    const statement = `INSERT INTO ${tableName} (beer_name, temp, sg, color, comment, timepoint) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(statement, [beer, temp, sg, color, comment, timepoint], function(err) {
        if (err) {
            throw err;
        }

        console.log('Insert successful', this.lastID);
    });
}
