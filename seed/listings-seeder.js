const mongoose = require('mongoose');
const db = require('../database/listings.js');


// mongoose is connected to our appData database
mongoose.connect('mongodb://database/appData');


// a function that generates a random number between 1 and max number
const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};


// a list of hipster sentences to be used for an image's description
const descriptions = ['Helvetica mustache palo santo snackwave synth selfies vaporware.', 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.', 'Chillwave selvage mixtape, williamsburg keytar helvetica woke bushwick direct trade typewriter cronut. Seitan irony waistcoat PBR&B cray craft beer.', 'Literally cardigan gochujang portland tbh. Af four dollar toast neutra four loko tousled shoreditch.', 'Offal microdosing photo booth, hot chicken kogi scenester squid letterpress.', 'Tote bag tumeric hot chicken, tacos normcore blog locavore keytar fam chambray distillery master cleanse selfies. Affogato palo santo edison bulb, hoodie vinyl you probably haven\'t heard of them twee echo park etsy.', 'Banjo activated charcoal cred meggings franzen. Chia austin wolf, trust fund artisan franzen normcore direct trade succulents iPhone plaid.', 'Woke chartreuse 8-bit fingerstache microdosing helvetica farm-to-table.', 'Intelligentsia kale chips hammock asymmetrical bespoke seitan health goth man bun freegan.', 'Slow-carb selfies air plant, glossier letterpress bitters viral. ', 'Farm-to-table meh disrupt blog enamel pin gentrify slow-carb direct trade green juice, la croix woke knausgaard deep v fanny pack everyday carry.', 'Blue bottle asymmetrical biodiesel pug vexillologist kitsch, quinoa pour-over.', 'Cred biodiesel craft beer, YOLO hashtag cray shoreditch edison bulb selvage of tofu swag typewriter godard.', 'Next level vice bicycle rights, actually lo-fi pok pok photo booth cred cliche VHS wayfarers hexagon.', 'Copper mug mlkshk cray, post-ironic man bun forage cloud bread banjo fanny pack yuccie 3 wolf moon shabby chic bicycle rights slow-carb.', 'pok pok you probably haven\'t heard of them chartreuse, hammock tacos sustainable franzen narwhal hell of.', 'Slow-carb polaroid lyft cliche bespoke green juice pabst.', 'Knausgaard raclette edison bulb, subway tile truffaut selfies poke pork belly taiyaki before they sold out cronut keytar forage chicharrones.', 'Kickstarter gluten-free lomo, pok pok gastropub succulents retro jianbing bespoke.', 'Kombucha tousled tofu, cred tbh swag poke.', 'Pop-up fingerstache chartreuse four dollar toast pug bespoke vexillologist hoodie, typewriter irony freegan.'];


// a generator that creates 100 listings and 30 - 39 images for each listing. These objects use the schemas found in '../models/listings.js'.
const listingsGenerator = function () {
  let listingsCount = 0;
  const finalArr = [];
  // each loop we create a new listing that gets pushed into the finalArr.
  while (listingsCount <= 100) {
    let imageLoopCount = 0;
    let imageCount = 0;
    const listingImages = [];
    const imagesUsedObj = {};
    const newListing = new db.listing({
      listingId: listingsCount,
      images: [],
    });
    // within the listing loop we have another loop that creates a new image and pushes it into the images property of the listing.
    while (imageCount <= 39) {
      imageLoopCount++;
      const num = getRandomInt(101);
      const descriptionIndex = getRandomInt(descriptions.length);
      if (!imagesUsedObj.hasOwnProperty(num)) {
        imageCount++;
        const newImageSource = `https://images-for-fec-project.s3-us-west-1.amazonaws.com/${num}.jpg`;
        imagesUsedObj[num] = num;
        const desc = descriptions[descriptionIndex];
        const newImage = {
          imageId: imageCount,
          imagePlaceNumber: imageCount,
          imageSource: newImageSource,
          imageDescription: desc,
        };
        newListing.images.push(newImage);
      }
    }
    finalArr.push(newListing);
    listingsCount++;
  }
  // return the new array of 100 listings
  return finalArr;
};


// created an array of 100 listings and set it to a variable
const listingArray = listingsGenerator();

// this is a tracker that makes sure we save every indexed element in the listingArray before we disconnect from the mongoose database.
let done = 0;

// the exit function disconnectes from the mongodatabase.
const exit = function () {
  mongoose.disconnect();
};


// A loop that looks at every single isting in the listingArray and saves it to our database.
for (let i = 0; i < listingArray.length; i++) {
  listingArray[i].save((err, result) => {
    done++;
    // once the done counter reaches the listingArray length it will call the exit function.
    if (done === listingArray.length) {
      mongoose.disconnect(process.exit());
    }
  });

}

