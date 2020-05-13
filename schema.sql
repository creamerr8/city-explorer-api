DROP TABLE location;

CREATE TABLE location (
  id SERIAL PRIMARY KEY, 
  search_query VARCHAR(255),
  latitude NUMERIC,
  longitude NUMERIC,
  formatted_query VARCHAR(255)
)