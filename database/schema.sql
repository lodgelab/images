CREATE DATABASE lodgelab;
\c lodgelab;

CREATE TABLE IF NOT EXISTS listings (
  id serial PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  username varchar
);

CREATE TABLE IF NOT EXISTS images (
  id serial PRIMARY KEY,
  image_description varchar,
  user_id smallint
);

CREATE TABLE IF NOT EXISTS listing_images (
  listing_id int, 
  image_id smallint 
);

CREATE TABLE IF NOT EXISTS tmp (
  listing_id int,
  image_id smallint,
  image_description varchar,
  user_id smallint,
  username varchar
);

CREATE INDEX idx_listing_images 
ON listing_images(listing_id);
