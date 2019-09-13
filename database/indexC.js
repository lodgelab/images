const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'airbnb' });

const getListing = (id) => {
  const query = 'SELECT * FROM listings WHERE id = ?';
  return client.execute(query, [id], { prepare: true });
};

const getImage = (listingId, imageId) => {
  const query = 'SELECT * FROM listings WHERE id = ? AND imageid = ?';
  return client.execute(query, [listingId, imageId], { prepare: true });
};

module.exports = {
  client,
  getListing,
  getImage,
};
