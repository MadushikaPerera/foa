CREATE TABLE `foa`.`user` (
     `uid` INT NOT NULL AUTO_INCREMENT,
     `fname` VARCHAR(45) NULL,
     `lname` VARCHAR(45) NULL,
     `uname` VARCHAR(45) NOT NULL,
     `email` VARCHAR(45) NULL,
     `password` VARCHAR(250) NULL,
     `phone` VARCHAR(45) NULL,
     `address` VARCHAR(45) NULL,
     `accesslevel` VARCHAR(45) NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
     PRIMARY KEY (`uid`),
     UNIQUE INDEX `UNIQUE` (`uname` ASC));


CREATE TABLE `foa`.`vehicle` (
    `vid` int(11) NOT NULL AUTO_INCREMENT,
    `brand` varchar(45) DEFAULT NULL,
    `model` varchar(45) DEFAULT NULL,
    `licenseno` varchar(45) DEFAULT NULL,
    `dob` varchar(45) DEFAULT NULL,
    `active` varchar(45) DEFAULT 'true',
    `quantity` int(11) DEFAULT NULL,
     PRIMARY KEY (`vid`),
     UNIQUE INDEX `licenseno_UNIQUE` (`licenseno` ASC));
             
        

CREATE TABLE `foa`.`driver` (
     `drid` INT NOT NULL,
     `empid` INT NULL,
     `licenseno` VARCHAR(45) NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
     PRIMARY KEY (`drid`),
     UNIQUE INDEX `licenseno_UNIQUE` (`licenseno` ASC));



CREATE TABLE `foa`.`meal` (
     `mid` INT NOT NULL,
     `name` VARCHAR(45) NULL,
     `type` VARCHAR(45) NULL,
     `price` DOUBLE NULL,
     `description` VARCHAR(200),
     `quantity` INT NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
      PRIMARY KEY (`mid`));


CREATE TABLE `foa`.`ingredient` (
  `iid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NULL,
  `quantity` INT NOT NULL,
  `price` DOUBLE NULL,
  `description` VARCHAR(255) NULL,
  `active` VARCHAR(45) NULL DEFAULT 'true',
  PRIMARY KEY (`iid`));



CREATE TABLE `foa`.`cart` (
  `cid` INT NOT NULL AUTO_INCREMENT,
  `item` VARCHAR(45) NULL,
  `quantity` INT NULL,
  `price` INT NULL,
  `user` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL DEFAULT 'pending',
  `dob` VARCHAR(45) NULL,
  `active` VARCHAR(45) NULL DEFAULT 'true',
  PRIMARY KEY (`cid`));


CREATE TABLE `foa`.`order` (
  `oid` INT NOT NULL AUTO_INCREMENT,
  `items` VARCHAR(255) NOT NULL,
  `totalprice` DOUBLE NULL,
  `user` VARCHAR(45) NOT NULL,
  `address` VARCHAR(250) NOT NULL,
  `contact` VARCHAR(45) NULL,
  `payment` VARCHAR(45) NOT NULL,
  `dob` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL DEFAULT 'pending',
  `active` VARCHAR(45) NULL DEFAULT 'true',
  PRIMARY KEY (`oid`));

  CREATE TABLE `foa`.`deliver` (
    `did` INT NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(255) NOT NULL,
    `user` VARCHAR(45) NOT NULL,
    `payment` VARCHAR(45) NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    `contact` VARCHAR(45) NULL,
    `totalprice` DOUBLE NULL,
    `employee` VARCHAR(45) NOT NULL,
    `vehicleno` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NULL DEFAULT 'pending',
    `ddate` VARCHAR(45) NOT NULL,
    `active` VARCHAR(45) NULL DEFAULT 'true',
    PRIMARY KEY (`did`));


CREATE TABLE `foa`.`promotion` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `rate` INT NULL,
  `startdate` VARCHAR(45) NOT NULL,
  `enddate` VARCHAR(45) NOT NULL,
  `active` VARCHAR(45) NULL DEFAULT 'true',
  PRIMARY KEY (`pid`));

                            
                            
                  