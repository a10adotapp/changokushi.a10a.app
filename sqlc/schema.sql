CREATE TABLE characters
(
  id INT unsigned NOT NULL AUTO_INCREMENT,
  name VARCHAR(191) NOT NULL,
  gif_url TEXT DEFAULT NULL,
  image_url TEXT DEFAULT NULL,
  profile_url TEXT DEFAULT NULL,
  bust INT DEFAULT NULL,
  waist INT DEFAULT NULL,
  hip INT DEFAULT NULL,
  height INT DEFAULT NULL,
  PRIMARY KEY (id)
)
;

CREATE TABLE likes
(
  id INT unsigned NOT NULL AUTO_INCREMENT,
  character_id INT NOT NULL,
  user VARCHAR(191) NOT NULL,
  liked_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX (character_id),
  INDEX (user, liked_at)
)
;

CREATE TABLE chantama_characters
(
  id INT unsigned NOT NULL AUTO_INCREMENT,
  character_id INT NOT NULL,
  sense ENUM("heart", "technique", "physique") NOT NULL,
  attack ENUM("intelligence", "bruteforce") NOT NULL,
  weapon ENUM("sword", "spear", "bow") NOT NULL,
  vitality INT NOT NULL,
  strength INT NOT NULL,
  physical_defense INT NOT NULL,
  magical_defense INT NOT NULL,
  agility INT NOT NULL,
  PRIMARY KEY (id)
)
;

CREATE TABLE weapon_logs
(
  id INT unsigned NOT NULL AUTO_INCREMENT,
  name VARCHAR(191) NOT NULL,
  url TEXT DEFAULT NULL,
  PRIMARY KEY (id)
)
;
