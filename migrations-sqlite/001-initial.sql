-- Up

CREATE TABLE Files (
  id   CHAR(36) PRIMARY KEY,
  file TEXT     NOT NULL,
  title TEXT	NOT NULL
);

-- Down

DROP DATABASE Files;