CREATE DATABASE lodgelab;

CREATE TABLE IF NOT EXISTS listing_images (
  listing_id int,
  image_id smallint, 
  image_description varchar
);

CREATE INDEX idx_listing_images 
ON listing_images(listing_id);