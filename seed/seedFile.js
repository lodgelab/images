const faker = require('faker');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const out = fs.createWriteStream('new.csv.gz');
gzip.pipe(out);
const start = Date.now();
const num = 10000000;

const calcTimeLeft = (linesNeeded, avg) => ((linesNeeded / avg) - (Date.now() - start) / 1000);

const getAvgSpeed = (linesDone, timeElasped) => linesDone / (timeElasped / 1000);

const logStats = (linesDone) => {
  if (linesDone % 10000 === 0) {
    const avg = getAvgSpeed(linesDone, Date.now() - start);
    console.log(`Time left: ${(calcTimeLeft(num, avg) / 60).toFixed(2)}m, AVG: ${avg.toFixed(2)}/s`);
    console.log(linesDone);
  }
};

const users = [];
for (let u = 0; u < 1000; u += 1) {
  users.push(faker.internet.userName());
}

const images = [];
for (let im = 0; im < 100; im += 1) {
  images.push({
    userId: faker.random.number(1000),
    desc: faker.lorem.sentence(),
  });
}

let i = 0;
(async () => {
  for (i = 0; i < num; i += 1) {
    logStats(i);
    const randUser = faker.random.number(1000);
    for (let j = 0; j < faker.random.number({ min: 5, max: 20 }); j += 1) {
      const randImg = faker.random.number(99);
      const ableToWrite = gzip.write(`${i},${randImg},${images[randImg].desc},${images[randImg].userId},${users[images[randImg].userId]}\n`);
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
