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

CREATE TABLE IF NOT EXISTS `Employers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `website` varchar(200),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;



CREATE TABLE IF NOT EXISTS `JobSeekers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200),
  `lastName` varchar(200),
  `address` text,
  `email` varchar(200),
  `phone` varchar(20),
  `sin` varchar(100),
  `DOB` date,
  `status` varchar(25),
  `gender` varchar(10),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;




---- 5 June 2017 ------
CREATE TABLE IF NOT EXISTS `JobTypes` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `JobCategories` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `Jobs` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`employerId` int(11),
`title` varchar(200),
`jobTypeId` int(11),
`jobLocation` varchar(200),
`startDate` date,
`endDate` date,
`startTime` time,
`endTime` time,
`wage` decimal(10,2),
`description` longtext,
`postDate` date,
`expiryDate` date,
`status` bit,
`jobCategoryId` int(11),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
PRIMARY KEY (`id`),
FOREIGN KEY(`jobTypeId`) REFERENCES JobTypes(`id`) ON DELETE CASCADE,
FOREIGN KEY(`jobCategoryId`) REFERENCES JobCategories(`id`) ON DELETE CASCADE,
FOREIGN KEY(`employerId`) REFERENCES Employers(`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `JobApplications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employerId` int(11) DEFAULT NULL,
  `applicationStatus` varchar(200) DEFAULT NULL,
  `appliedOn` date DEFAULT NULL,
  `jobId` int(11) DEFAULT NULL,
  `jobSeekerId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobId` (`jobId`),
  KEY `jobSeekerId` (`jobSeekerId`),
  KEY `employerId` (`employerId`),
  FOREIGN KEY (`jobId`) REFERENCES `Jobs` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeekers` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`employerId`) REFERENCES `Employers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9;


-- 15 June 2017

create table `JobSeekerTokens`(
`id` int(20) NOT NULL AUTO_INCREMENT,
`token` varchar(200) NOT NULL,
`jobSeekerId` int(11) DEFAULT NULL,
PRIMARY KEY(`id`),
FOREIGN KEY (`jobSeekerId`) REFERENCES `JobSeekers` (`id`) ON DELETE CASCADE,
UNIQUE KEY(`token`),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME
)ENGINE=InnoDB AUTO_INCREMENT=1;

-- 17 June 2017 add foreign key 


--23 June 2017 jobApplication Status

create table `JobApplicationStatuses`(
`id` int(20) NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` TIMESTAMP NOT NULL DEFAULT 0,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` DATETIME,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;





/*drop table Jobs;
drop table JobSeekers;
drop table JobCategories;
drop table JobTypes;
drop table Employers; */
