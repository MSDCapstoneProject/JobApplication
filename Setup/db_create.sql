-- db create script 

create database jobbridge;

USE jobbridge;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


INSERT INTO `Employers` ( `name`, `address`, `email`, `phone`,`website`) VALUES
( 'Bock Tools', '12, Cambridge','jobs@bock.com', '22678909', 'http://www.bocktools.com'),
( 'Horizon Parts', '2-A, Kitchener','jobs@horizonparts.com', '519677289','http://www.horizonparts.com');

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
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


INSERT INTO `JobSeekers` ( `firstname`,`lastName`, `address`, `email`,`phone`,`sin`,`DOB`,`status`,`gender`) VALUES
( 'Jen','Smith', 'Kitchener','jerry@gmail.com', '22293343','333422344','1990-02-12','citizen','male'),
( 'Kitty','karen', 'Waterloo','kitty@gmail.com', '4433334','4444','1980-10-03','student','female');

---- 5 June 2017 ------
CREATE TABLE IF NOT EXISTS `JobTypes` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `JobCategories` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(200),
`internalCode` varchar(200),
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime,
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
`description` blob,
`postDate` date,
`expiryDate` date,
`status` bit,
`jobCategoryId` int(11),
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`deletedAt` datetime,
PRIMARY KEY (`id`),
FOREIGN KEY(`jobTypeId`) REFERENCES JobTypes(`id`) ON DELETE CASCADE,
FOREIGN KEY(`jobCategoryId`) REFERENCES JobCategories(`id`) ON DELETE CASCADE,
FOREIGN KEY(`employerId`) REFERENCES Employers(`id`) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;

INSERT INTO `JobTypes` (`description`,`internalCode`) VALUES 
('Full-time','FULL_TIME'),
('Part-time', 'PART_TIME'), 
('Temporary', 'TEMPORARY'),
('contract', 'CONTRACT'),
('Commission', 'COMMISSION');

INSERT INTO `JobCategories` (`description`,`internalCode`) VALUES 
('General Labour','GENERAL_LABOUR'),
('Construction Worker','CONSTRUCTION_WORKER'),
('Warehouse Helper','WAREHOUSE_HELPER'),
('Forklift Driver','FORKLIFT_DRIVER'),
('Plumber','PLUMBER');

INSERT INTO `Jobs` (`employersId`,`title`,`jobType`,`jobLocation`,`startDate`,`endDate`,`startTime`,`endTime`,`wage`,`description`,`postDate`,`expiryDate`,`status`,`jobCategory`) VALUES
(2, 'General Labour',2, 'Vaughan, ON','2017-07-20','2017-07-25','08:00:00','17:00:00',14.00,"Front Line Work Force Inc. has over 20 years of human resource management experience, providing innovative workforce solutions to companies of all sizes, to meet the challenges of today's changing business environments and provide a level of service that reflects our commitment to excellence. Combining the right people with our in house assessment software technologies ensures Front Line Work Force will successfully meet all your staffing needs. Front Line Work Force accommodates a diverse and broad based sector of staffing needs whether it's, Skilled/Unskilled Industrial Labour or Office Personnel on a temporary, contractual or permanent basis. Whatever your 'frontline' requirements are, Front Line Work Force has the resources to meet all your requirements. Front Line Work Force specializes in the placement of individuals for all skilled trades, production, distribution, manufacturing and office support personnel throughout the GTA.

Our client electrical distribution industry, our goal was simply to take something great and make it better, more competitive, and more valuable as a supplier to existing and new customers. Their growth has been remarkable in a very short time", '2017-07-01','2017-07-19',1,2),
(1, 'Order Picker/Packer',3, 'Milton, ON','2017-07-25','2017-08-06','07:00:00','16:00:00',12.50,"Our client is an Automotive parts warehouse in the Milton area and is looking for energetic Order picker and packers.

Job Description :

General labour and order picking as assigned
Lifting up to 70 lbs
Operating basic warehouse transport equipment
Attention to detail and accuracy
Repetitive work bending, twisting, standing for long periods of time
All other duties as assigned by supervisor
Safety shoes mandatory; proper dress attire is long pants and t-shirt unless otherwise stated", '2017-07-05','2017-07-14',1,3);