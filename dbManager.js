const uuid = require('uuid-random');
const sqlite = require('sqlite')

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

async function listFiles() {
  const db = await dbConn;
  return db.all('SELECT * FROM Files');
}

async function addFile(file) {
    console.log(file)
  const db = await dbConn;

  const id = uuid();
  await db.run('INSERT INTO Files VALUES (?, ?, ?)', [id, file.file, file.title]);

  return listFiles();
}

module.exports = {addFile}
