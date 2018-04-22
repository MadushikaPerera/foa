CREATE TABLE `foa`.`user` (
     `uid` INT NOT NULL AUTO_INCREMENT,
     `fname` VARCHAR(45) NULL,
     `lname` VARCHAR(45) NULL,
     `uname` VARCHAR(45) NOT NULL,
     `email` VARCHAR(45) NULL,
     `phone` VARCHAR(45) NULL,
     `address` VARCHAR(45) NULL,
     `accesslevel` INT NULL DEFAULT NULL ,
     `active` VARCHAR(45) NULL DEFAULT 'true',
     PRIMARY KEY (`uid`),
     UNIQUE INDEX `UNIQUE` (`uname` ASC));


CREATE TABLE `foa`.`delivery` (
     `did` INT NOT NULL AUTO_INCREMENT,
     `order` INT NULL,
     `vehicleno` VARCHAR(45) NULL,
     `driverid` INT NULL,
     `pickuptime` VARCHAR(45) NULL,
     `duration` INT NULL,
     `status` VARCHAR(45) NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
     PRIMARY KEY (`did`),
     UNIQUE INDEX `vno_UNIQUE` (`vehicleno` ASC));

CREATE TABLE `foa`.`vehicle` (
     `vid` INT NOT NULL,
     `brand` VARCHAR(45) NULL,
     `model` VARCHAR(45) NULL,
     `licenseno` VARCHAR(45) NULL,
     `dob` VARCHAR(45) NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
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
     `rid` INT NULL,
     `name` VARCHAR(45) NULL,
     `type` VARCHAR(45) NULL,
     `price` DOUBLE NULL,
     `quantity` VARCHAR(45) NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
      PRIMARY KEY (`mid`));

                         
 CREATE TABLE `foa`.`oder` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `oderid` VARCHAR(45) NULL,
     `cid` INT NULL,
     `cname` VARCHAR(45) NULL,
     `address` VARCHAR(45) NULL,
     `phone` VARCHAR(45) NULL,
     `oprice` DOUBLE NULL,
     `cartitems` VARCHAR(45) NULL,
     `otype` VARCHAR(45) NULL,
     `cashmethod` VARCHAR(45) NULL,
     `odate` VARCHAR(45) NULL,
     `status` VARCHAR(45) NULL,
     `active` VARCHAR(45) NULL DEFAULT 'true',
     PRIMARY KEY (`id`));
                            
                            
                  