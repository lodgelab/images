/* eslint-disable no-console */
const faker = require('faker');
const dbC = require('../database/indexC.js');
const dbPG = require('../database/indexPG.js');

const rands = [];
const n = 2000;

let cstart;
let pgstart;

for (let i = 0; i < n; i += 1) {
  rands.push(faker.random.number({ min: 0, max: 10000000 }));
}

console.log('DONE GENERATING');
console.log('------');

const queryC = (counter) => {
  if (!cstart) {
    cstart = Date.now();
    console.log('CASS STARTED AT: ', cstart);
  }
  const start = Date.now();
  return dbC
    .getListing(counter)
    .then(() => Date.now() - start)
    .catch((err) => { throw err; });
};

const queryPG = (counter) => {
  if (!pgstart) {
    pgstart = Date.now();
    console.log('POST STARTED AT: ', pgstart);
  }
  const start = Date.now();
  return dbPG
    .getListing(counter)
    .then(() => Date.now() - start)
    .catch((err) => { throw err; });
};

(async () => {
  const pg = await Promise
    .all(rands.map((num) => queryPG(num)))
    .then((result) => {
      console.log('POST ENDED AT: ', Date.now());
      console.log(`POST finished ${n} queries in: ${Date.now() - pgstart} ms`);
      console.log(`POST combined time: ${result.reduce((acc, cur) => (acc + cur))} ms`);
      return Date.now() - pgstart;
    });
  console.log('------');
  const c = await Promise
    .all(rands.map((num) => queryC(num)))
    .then((result) => {
      console.log('CASS ENDED AT: ', Date.now());
      console.log(`CASS finished ${n} queries in: ${Date.now() - cstart} ms`);
      console.log(`CASS combined time: ${result.reduce((acc, cur) => (acc + cur))} ms`);
      return Date.now() - cstart;
    });

  console.log('******************');
  if (pg < c) {
    console.log(`Post won by ${c - pg} ms`);
  } else {
    console.log(`Cass won by ${pg - c} ms`);
  }
  process.exit();
})();
