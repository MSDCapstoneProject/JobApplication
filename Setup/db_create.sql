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

CREATE TABLE IF NOT EXISTS `jobs` (
`id` int NOT NULL AUTO_INCREMENT,
`employerId` int,
`title` varchar(200),
`jobTypeId` int,
`street` varchar(200),
`city` varchar(200),
`postalCode` varchar(20),
`startDate` date,
`endDate` date,
`startTime` time,
`endTime` time,
`wage` decimal(10,2),
`description` longtext,
`postDate` date,
`expiryDate` date,
`status` bit,
`jobCategoryId` int,
`createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY(`jobTypeId`) REFERENCES jobTypes(`id`) ON DELETE CASCADE,
FOREIGN KEY(`jobCategoryId`) REFERENCES jobCategories(`id`) ON DELETE CASCADE,
FOREIGN KEY(`employerId`) REFERENCES employers(`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;

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

-- 28 June 2017 JobSeekerNotifications

CREATE TABLE IF NOT EXISTS `jobSeekerNotifications` (
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

/*USE heroku_81310767018f667;

drop table jobapplications;
drop table jobs;
drop table employers;
drop table jobseekertokens;
drop table jobSeekers;
drop table jobseekernotifications;
drop table jobCategories;
drop table jobTypes;
drop table topics;
drop table topicgroups; */