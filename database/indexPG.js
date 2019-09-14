const { Client, Pool } = require('pg');
const config = require('../database/postgres/config.js');

const client = new Client(config);
const pool = new Pool(config);

client.connect();

const getListing = (id) => client.query('SELECT * FROM listing_images WHERE listing_id=($1)', [id]);

module.exports = {
  getListing,
  client,
  pool,
};
