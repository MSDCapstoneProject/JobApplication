USE heroku_81310767018f667;

SET SQL_MODE = "ALLOW_INVALID_DATES";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
-- --------------------------------------------------------


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- create employers table

CREATE TABLE IF NOT EXISTS `employers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `street` text,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `website` varchar(200),
  `city` varchar(200),
  `province` varchar(200),
  `country` varchar(200),
  `postalCode` varchar(20),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;



CREATE TABLE IF NOT EXISTS `jobSeekers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200),
  `lastName` varchar(200),
  `street` text,
  `city` varchar(200),
  `province` varchar(200),
  `country` varchar(200),
  `postalCode` varchar(20),
  `email` varchar(200),
  `phone` varchar(20),
  `sin` varchar(100),
  `DOB` date,
  `status` varchar(25),
  `gender` varchar(10),
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


---- 5 June 2017 ------
CREATE TABLE IF NOT EXISTS `jobTypes` (
`id` int NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `jobCategories` (
`id` int NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employerId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `jobTypeId` int(11) DEFAULT NULL,
  `street` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `wage` decimal(10,2) DEFAULT NULL,
  `description` longtext,
  `postDate` date DEFAULT NULL,
  `expiryDate` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `jobCategoryId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `totalPositions` int(11) DEFAULT NULL,
  `filledPositions` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobTypeId` (`jobTypeId`),
  KEY `jobCategoryId` (`jobCategoryId`),
  KEY `employerId` (`employerId`),
  FOREIGN KEY (`jobTypeId`) REFERENCES `jobtypes` (`id`) ON DELETE CASCADE,
 FOREIGN KEY (`jobCategoryId`) REFERENCES `jobcategories` (`id`) ON DELETE CASCADE,
FOREIGN KEY (`employerId`) REFERENCES `employers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE `jobApplications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobapplicationstatusId` int DEFAULT NULL,
  `appliedOn` date DEFAULT NULL,
  `employerId` int DEFAULT NULL,
  `jobId` int DEFAULT NULL,
  `jobSeekerId` int DEFAULT NULL,
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`jobapplicationstatusId`) REFERENCES `jobapplicationstatuses` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`jobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`jobSeekerId`) REFERENCES `jobSeekers` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`employerId`) REFERENCES `employers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1;


-- 15 June 2017

create table `JobSeekerTokens`(
`id` int NOT NULL AUTO_INCREMENT,
`token` varchar(200) NOT NULL,
`jobSeekerId` int DEFAULT NULL,
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY(`id`),
FOREIGN KEY (`jobSeekerId`) REFERENCES `jobSeekers` (`id`) ON DELETE CASCADE,
UNIQUE KEY(`token`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

-- 17 June 2017 add foreign key 


-- 23 June 2017 jobApplication Status

create table `jobApplicationStatuses`(
`id` int NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

-- 26 June 2017 Topics

CREATE TABLE IF NOT EXISTS `topicGroups` (
`id` int NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `topics` (
`id` int NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`topicGroupId` int,
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY(`topicGroupId`) REFERENCES topicGroups(`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;

-- 28 June 2017 JobSeekerSubscriptions

CREATE TABLE IF NOT EXISTS `jobseekersubscriptions` (
`id` int NOT NULL AUTO_INCREMENT,
`topicId` int,
`jobSeekerId` int,
`status` boolean,
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY(`topicId`) REFERENCES topics(`id`) ON DELETE CASCADE,
FOREIGN KEY(`jobSeekerId`) REFERENCES jobSeekers(`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;

ALTER TABLE `heroku_81310767018f667`.`jobs` 
ADD COLUMN `province` VARCHAR(45) NULL AFTER `city`,
ADD COLUMN `country` VARCHAR(200) NULL AFTER `province`;



/*USE heroku_81310767018f667;

drop table jobapplications;
drop table jobs;
drop table employers;
drop table jobseekertokens;
drop table jobSeekers;
drop table jobSeekerSubscriptions;
drop table jobCategories;
drop table jobTypes;
drop table topics;
drop table topicgroups; */