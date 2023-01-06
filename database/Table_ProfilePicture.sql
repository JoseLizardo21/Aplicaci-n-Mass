CREATE TABLE imageProfile(
    id INT(11) NOT NULL,
    nameImage VARCHAR(120) NOT NULL,
    image_id INT(11) NOT NULL,
    CONSTRAINT fk_imageProfile FOREIGN KEY (image_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE imageProfile
    ADD PRIMARY KEY (id);

ALTER TABLE imageProfile
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;