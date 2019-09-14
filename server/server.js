const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
// const dbC = require('../database/indexC.js');
const dbPG = require('../database/indexPG.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/api/listings/:listing', express.static(`${__dirname}/../client/dist`));
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/api/listings/:listing/images', (req, res) => {
  const listingId = req.params.listing;
  // CASSANDRA
  // dbC
  //   .getListing(listingId)
  //   .then((result) => {
  //     const data = [{ listingId, images: [] }];
  //     for (let i = 0; i < result.rows.length; i += 1) {
  //       const image = {
  //         imageId: i + 1,
  //         imagePlaceNumber: i + 1,
  //         imageSource: constructURL(result.rows[i].image_id),
  //         imageDescription: result.rows[i].image_description,
  //       };
  //       data[0].images.push(image);
  //     }
  //     res.send(data);
  //   });
  // POSTGRESS
  dbPG
    .getListing(listingId)
    .then((result) => {
      const data = [{ listingId, images: [] }];
      for (let i = 0; i < result.rows.length; i += 1) {
        const image = {
          imageId: i + 1,
          imagePlaceNumber: i + 1,
          imageSource: constructURL(result.rows[i].image_id),
          imageDescription: result.rows[i].image_description,
        };
        data[0].images.push(image);
      }
      res.send(data);
    });
});

app.listen(3777, () => {
  console.log('listening on port 3777');
});

const constructURL = (imageid) => `https://mock-property-images.s3-us-west-1.amazonaws.com/activities/fun-${imageid}.jpeg`;
