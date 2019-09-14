const LineByLineReader = require('line-by-line');
const db = require('../database/indexPG.js');

const start = Date.now();

const calcTimeLeft = (linesNeeded, avg) => ((linesNeeded / avg) - ((Date.now() - start) / 1000));

const getAvgSpeed = (linesDone, timeElasped) => linesDone / (timeElasped / 1000);

const logStats = (linesDone) => {
  if (linesDone % 10000 === 0) {
    const avg = getAvgSpeed(linesDone, Date.now() - start);
    console.log(`Time left: ${(calcTimeLeft(140000000, avg) / 60).toFixed(2)}m, AVG: ${avg.toFixed(2)}/s`);
  }
  if (linesDone % 10000 === 0) {
    console.log(linesDone);
  }
};

db.pool
  .connect()
  .then((client) => {
    const lr = new LineByLineReader('10mData.csv');
    let linesDone = 0;
    let queries = 0;
    lr.on('line', (line) => {
      if (queries >= 50000) {
        lr.pause();
      }
      linesDone += 1;
      logStats(linesDone);
      const arr = line.split(',');
      queries += 1;
      client.query(`INSERT INTO listing_images(listing_id, image_id, image_description) VALUES(${arr[0]},${arr[1]},'${arr[2]}')`)
        .then(() => {
          queries -= 1;
          lr.resume();
        });
    });
    lr.on('end', () => {
      console.log('COMPLETED', (Date.now() - start) / 1000 / 60, 'm');
    });
  });

// db.pool.query('INSERT INTO listings(id) VALUES (4)')
//   .then(() => db.pool.query(query))
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
