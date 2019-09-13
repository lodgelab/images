const faker = require('faker');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const out = fs.createWriteStream('smalltest.csv.gz');
gzip.pipe(out);
const start = Date.now();
let i = 0;
const num = 10000;
(async () => {
  for (i = 1; i <= num; i += 1) {
    const numImages = Math.floor(Math.random() * 10) + 10;
    for (let j = 0; j < numImages; j += 1) {
      const numImg = Math.floor(Math.random() * 100);
      const ableToWrite = gzip.write(`${i},${numImg},${faker.lorem.sentence()}\n`);
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
      console.log(Date.now() - start, 'ms');
      resolve();
    });
  });
})();
