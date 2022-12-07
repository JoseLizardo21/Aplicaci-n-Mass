use MASS;
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(22) NOT NULL,
    password VARCHAR(86) NOT NULL,
    email VARCHAR(100) NOT NULL
);

ALTER TABLE users
    