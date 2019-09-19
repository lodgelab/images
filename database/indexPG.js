const { Client, Pool } = require('pg');
const config = require('../database/postgres/config.js');

const client = new Client(config);
const pool = new Pool(config);

// client.connect();
pool.connect();

const getListingImages = (id) => pool
  .query('SELECT lim.listing_id, lim.image_id, im.image_description FROM listing_images lim, images im WHERE listing_id=($1) and lim.image_id = im.id;', [id])
  .then((result) => result.rows);

const getListingImage = (listingId, imageId) => pool
  .query('SELECT lim.listing_id, lim.image_id, im.image_description FROM listing_images lim, images im WHERE listing_id=($1) and im.id=($2) and im.id = lim.image_id', [listingId, imageId])
  .then((result) => result.rows);

const postImage = (listingId, imageId, desc, userId) => pool
  .query('INSERT INTO images VALUES (($1), ($2), ($3));', [imageId, desc, userId])
  .then(() => pool.query('INSERT INTO listing_images VALUES (($1), ($2));', [listingId, imageId]))
  .catch((err) => {
    console.error(err.detail);
  });

const deleteListingImage = (listingId, imageId) => pool
  .query('DELETE FROM listing_images WHERE listing_id=($1) and image_id=($2);', [listingId, imageId])
  .then((result) => result.rows);

const editImage = (imageId, newId) => pool
  .query('UPDATE images SET image_id=($1) WHERE id=($2);', [newId, imageId])
  .then((result) => result);

const editDescription = (imageId, desc) => pool
  .query('UPDATE image SET image_description=($1) WHERE id=($2);', [desc, imageId])
  .then((result) => result);

module.exports = {
  postImage,
  editImage,
  deleteListingImage,
  editDescription,
  getListingImages,
  getListingImage,
  client,
  pool,
};
