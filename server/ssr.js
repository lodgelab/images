import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from '../client/src/components/App.jsx';
import dbPG from '../database/indexPG';

export const renderString = (req, res) => {
  const id = req.params.listing;
  dbPG
    .getListingImages(req.params.listing)
    .then((result) => {
      res.send({
        render: ReactDOMServer.renderToString(<App images={result} />),
        data: result,
      });
    });
};

// export renderString;
