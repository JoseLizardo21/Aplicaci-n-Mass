CREATE TABLE Preregistration(
    id INT(11) NOT NULL,
    username VARCHAR(22) NOT NULL,
    phoneNumber INT(11),
    email VARCHAR(100) NOT NULL
);
ALTER TABLE Preregistration
    ADD PRIMARY KEY (id);

ALTER TABLE Preregistration
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;