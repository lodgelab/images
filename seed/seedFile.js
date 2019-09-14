const faker = require('faker');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const out = fs.createWriteStream('test1.csv.gz');
gzip.pipe(out);
const start = Date.now();
const num = 10000000;

const calcTimeLeft = (linesNeeded, avg) => ((linesNeeded / avg) - (Date.now() - start) / 1000);

const getAvgSpeed = (linesDone, timeElasped) => linesDone / (timeElasped / 1000);

const logStats = (linesDone) => {
  if (linesDone % 10000 === 0) {
    const avg = getAvgSpeed(linesDone, Date.now() - start);
    console.log(`Time left: ${(calcTimeLeft(num, avg) / 60).toFixed(2)}m, AVG: ${avg.toFixed(2)}/s`);
  }
  if (linesDone % 10000 === 0) {
    console.log(linesDone);
  }
};

let i = 0;
(async () => {
  for (i = 1; i <= num; i += 1) {
    logStats(i);
    for (let j = 0; j < faker.random.number({ min: 5, max: 20 }); j += 1) {
      const ableToWrite = gzip.write(`${i},${faker.random.number(100)},${faker.lorem.sentence()}\n`);
      if (!ableToWrite) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
          gzip.once('drain', resolve);
        });
      }
    }
  }
  await new Promise((resolve) => {
    gzip.end('', () => {
      // eslint-disable-next-line no-console
      console.log(Date.now() - start, 'ms');
      resolve();
    });
  });
})();
