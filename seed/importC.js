/* eslint-disable no-console */
const LineByLineReader = require('line-by-line');
const db = require('../database/indexC.js');

const start = Date.now();

const calcTimeLeft = (linesNeeded, avg) => ((linesNeeded / avg) - (Date.now() - start) / 1000);

const getAvgSpeed = (linesDone, timeElasped) => linesDone / (timeElasped / 1000);

const logStats = (linesDone) => {
  if (linesDone % 10000 === 0) {
    const avg = getAvgSpeed(linesDone, Date.now() - start);
    console.log(`Time left: ${(calcTimeLeft(10000000, avg) / 60).toFixed(2)}m, AVG: ${avg.toFixed(2)}/s`);
  }
  if (linesDone % 10000 === 0) {
    console.log(linesDone);
  }
};
const run = async () => {
  db.client.execute(`
  CREATE KEYSPACE IF NOT EXISTS lodgelab
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  }
  `)
    .then(() => {
      db.client.execute('USE lodgelab');
    })
    .then(() => {
      db.client.execute(`
      CREATE TABLE IF NOT EXISTS listing_images (
        listing_id int,
        image_id int,
        image_description text,
        PRIMARY KEY(listing_id, image_id)
      );
    `);
    })
    .then(() => {
      const lr = new LineByLineReader('test1.csv');
      const q = 'INSERT INTO listings (listing_id, image_id, image_description) VALUES (?, ?, ?)';
      let linesDone = 0;
      let queries = 0;
      lr.on('line', (line) => {
        logStats(linesDone);
        if (queries >= 2048) {
          lr.pause();
        } else {
          const arr = line.split(',');
          [linesDone] = arr;
          queries += 1;
          db.client.execute(q, arr, { prepare: true })
            .then(() => {
              queries -= 1;
              lr.resume();
            });
        }
      });
      lr.on('end', () => {
        console.log('COMPLETED', (Date.now() - start) / 1000 / 60, 'm');
      });
    });
};


run();
