CREATE DATABASE flight_db;

use flight_db;

CREATE TABLE flight (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codFlight       CHAR(7) NOT NULL,
    arrivalTime     TIME NOT NULL,
    airLine         VARCHAR(30) NOT NULL,
    delayedB		BOOLEAN
);


select * from flight