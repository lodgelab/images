const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'lodgelab' });

client.execute(`
    CREATE KEYSPACE IF NOT EXISTS lodgelab
    WITH REPLICATION = { 
      'class' : 'SimpleStrategy', 
      'replication_factor' : 1 
    }
  `)
  .then(() => {
    client.execute('USE lodgelab');
  })
  .then(() => {
    client.execute(`
    CREATE TABLE IF NOT EXISTS listings (
      listing_id int,
      image_id int,
      image_description text,
      PRIMARY KEY(listing_id, image_id)
    );
  `);
  });

const getListing = (id) => {
  const query = 'SELECT * FROM listings WHERE listing_id = ?';
  return client.execute(query, [id], { prepare: true });
};

const getImage = (listingId, imageId) => {
  const query = 'SELECT * FROM listings WHERE listing_id = ? AND image_id = ?';
  return client.execute(query, [listingId, imageId], { prepare: true });
};

module.exports = {
  client,
  getListing,
  getImage,
};
