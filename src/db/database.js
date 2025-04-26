import Database from 'better-sqlite3';

const db = new Database('activity_logs.db', { verbose: console.log('Database Started 🔥🔥🔥') });

class DatabaseService {
    constructor() { }

    init() {
        db.prepare(`
                CREATE TABLE IF NOT EXISTS activities (
                
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                date            TEXT,
                name            TEXT,
                lastTimeUsed    TEXT,
                timeInSeconds   INTEGER
            )
        `).run();

        return this;
    }

    insertOrUpdate({ date, name, lastTimeUsed, timeInSeconds }) {

        const existing = db.prepare(`
            SELECT * FROM activities WHERE date = ? AND name = ?
        `).get(date, name);

        if (existing) {
            db.prepare(`
                UPDATE activities
                SET timeInSeconds = timeInSeconds + ?,
                    lastTimeUsed = ?
                WHERE date = ? AND name = ?
            `).run(timeInSeconds, lastTimeUsed, date, name);
        } else {
            db.prepare(`
               INSERT INTO activities (date, name, timeInSeconds, lastTimeUsed)
               VALUES (?, ?, ?, ?)
            `).run(date, name, timeInSeconds, lastTimeUsed);
        }
    }

}

export default DatabaseService; 