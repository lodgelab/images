SELECT 'CREATE DATABASE lodgelab'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'lodgelab')\gexec
\c lodgelab;
CREATE TABLE IF NOT EXISTS listings (
  id serial primary key, 
  images json
);