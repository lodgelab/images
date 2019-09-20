const dbPG = require('../database/indexPG.js');

const getImages = (req, res) => {
  dbPG
    .getListingImages(req.params.listing)
    .then((result) => {
      res.send(result);
    });
};

const deleteImage = (req, res) => {
  dbPG
    .deleteListingImage(req.params.listing, req.params.image)
    .then((result) => res.send(result));
};

const addImage = (req, res) => {
  const { listing, image } = req.params;
  const { desc, userId } = req.body;
  dbPG
    .postImage(listing, image, desc, userId)
    .then((result) => res.send(result));
};

const editDesc = (req, res) => {
  dbPG
    .editDescription(req.params.image, req.body.description)
    .then((result) => res.send(result));
};

module.exports = {
  editDesc,
  getImages,
  deleteImage,
  addImage,
};
