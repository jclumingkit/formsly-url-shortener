DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public AUTHORIZATION postgres;

-- Start: tables

CREATE TABLE short_url_table (
  short_url_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  short_url_original_url VARCHAR(4000) NOT NULL,
  short_url_hash VARCHAR(64) UNIQUE NOT NULL,
  short_url_short_url VARCHAR(4000) NOT NULL,
  short_url_date_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- End: tables


GRANT ALL ON ALL TABLES IN SCHEMA public TO PUBLIC;
GRANT ALL ON ALL TABLES IN SCHEMA public TO POSTGRES;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;