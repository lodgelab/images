require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
// const dbPG = require('../database/indexPG.js');
const controller = require('./controller.js');

const app = express();

// app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/api/listings/:listing', express.static(`${__dirname}/../client/dist`));
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/api/listings/:listing/images', controller.getImages);

app.delete('/api/listings/:listing/images/:image', controller.deleteImage);

app.post('/api/listing/:listing/images/:image', controller.addImage);

app.put('/api/listing/:listing/images/:image/description', controller.editDesc);

app.listen(3777, () => {
  console.log('listening on port 3777');
});

const constructURL = (imageid) => `https://mock-property-images.s3-us-west-1.amazonaws.com/activities/fun-${imageid}.jpeg`;

// const data = [{
//   listingId: req.params.listing,
//   images: [],
// }];
// for (let i = 0; i < result.length; i += 1) {
//   const image = {
//     imageId: i + 1,
//     imagePlaceNumber: i + 1,
//     imageSource: constructURL(result[i].image_id),
//     imageDescription: result[i].image_description,
//   };
//   data[0].images.push(image);
// }
