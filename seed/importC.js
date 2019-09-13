const LineByLineReader = require('line-by-line');
const db = require('../database/indexC2.js');

const start = Date.now();
const run = async () => {
  db.client.execute(`
  CREATE KEYSPACE IF NOT EXISTS airbnb
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  }
  `)
    .then(() => {
      db.client.execute('USE airbnb');
    })
    .then(() => {
      db.client.execute(`
      CREATE TABLE IF NOT EXISTS listings (
        id int,
        imageId int,
        imageDescription text,
        PRIMARY KEY(id, imageId)
      );
    `);
    })
    .then(() => {
      const lr = new LineByLineReader('test.csv');
      const q = 'INSERT INTO listings (id, imageId, imageDescription) VALUES (?, ?, ?)';
      let linesDone = 0;
      let queries = 0;
      lr.on('line', (line) => {
        linesDone += 1;
        const arr = line.split(',');
        if (linesDone % 10000 === 0) {
          console.log(linesDone);
        }
        if (queries >= 2048) {
          lr.pause();
        } else {
          queries += 1;
          db.client.execute(q, arr, { prepare: true })
            .then(() => {
              queries -= 1;
              lr.resume();
            });
        }
      });
      lr.on('end', () => {
        console.log(Date.now() - start, 'ms');
      });
    });
};

run();
