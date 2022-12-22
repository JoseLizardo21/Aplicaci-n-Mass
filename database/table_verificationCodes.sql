CREATE TABLE VerificationCodes(
    id INT(11) NOT NULL,
    usrCreationCode INT(4) NOT NULL,
    VerifiedAccount BOOLEAN NOT NULL,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE VerificationCodes 
    ADD PRIMARY KEY (id);

ALTER TABLE VerificationCodes  
    MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;