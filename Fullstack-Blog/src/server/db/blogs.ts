import { Connection } from './index';
import { rejects } from 'assert';
import { resolve } from 'path';

export const all = async () => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * FROM blogs', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export default {
    all
}