require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const controller = require('./controller.js');
const ssr = require('./ssr');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use('/api/listings/:listing', express.static(`${__dirname}/../client/dist`));
app.use(express.static('client/dist'));

app.get('/ssr/listings/:listing', ssr.default);

app.get('/api/listings/:listing/images', controller.getImages);

app.delete('/api/listings/:listing/images/:image', controller.deleteImage);

app.post('/api/listing/:listing/images/:image', controller.addImage);

app.put('/api/listing/:listing/images/:image/description', controller.editDesc);

app.listen(3777, () => {
  console.log('listening on port 3777');
});
