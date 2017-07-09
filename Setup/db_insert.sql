Use klvbr8oj6g21j61r;

INSERT INTO `employers` (`name`, `email`, `phone`, `website`, `street`, `city`, `province`, `country`, `postalCode`) VALUES ('Bock Tools', 'jobs@bocktools.com', '519008332', 'http://www.bocktools.com', '12 bishop street', 'Cambridge', 'Ontario', 'Canada', 'N2A2E3');
INSERT INTO `employers` (`name`, `email`, `phone`, `website`, `street`, `city`, `province`, `country`, `postalCode`) VALUES ('Black Smith', 'jobs@blacksmith.com', '226838000', 'http://www.blacksmith.com', '39 Morgan Street', 'London', 'Ontario', 'Canada', 'N2A4T7');
INSERT INTO `employers` (`name`, `email`, `phone`, `website`, `street`, `city`, `province`, `country`, `postalCode`) VALUES ('People Works Ltd.', 'jobs@peopleworks.com', '230929929', 'http://www.peopleworks.com', '40 Forest Glen Road', 'Kitchener', 'Ontario', 'Canada', 'N2Y7F5');
INSERT INTO `employers` (`name`, `email`, `phone`, `website`, `street`, `city`, `province`, `country`, `postalCode`) VALUES ('Diamond Metals Ltd.', 'jobs@diamondmetals.com', '2347775788', 'http://www.diamondmetals.com', '87 Black Wood', 'Waterloo', 'Ontario', 'Canada', 'N3D7Y6');


INSERT INTO `jobSeekers` (`firstName`, `lastName`, `street`, `city`, `province`, `country`, `postalCode`, `email`, `phone`, `sin`, `DOB`, `status`, `gender`) VALUES ('Tony', 'Smith', '3 Hill Road', 'Kitchener', 'Ontario', 'Canada', 'N2A2R4', 'tony@gmail.com', '2264452224', '4522422', '1980-01-01', 'Resident', 'Male');
INSERT INTO `jobSeekers` (`firstName`, `lastName`, `street`, `city`, `province`, `country`, `postalCode`, `email`, `phone`, `sin`, `DOB`, `status`, `gender`) VALUES ('Kim', 'Jules', '4 Trees Road', 'Waterloo', 'Ontario', 'Canada', 'N2R4T5', 'kim@gmail.com', '5198838829', '4424441', '1995-02-12', 'Resident', 'Female');
INSERT INTO `jobSeekers` (`firstName`, `lastName`, `street`, `city`, `province`, `country`, `postalCode`, `email`, `phone`, `sin`, `DOB`, `status`, `gender`) VALUES ('Oly', 'John', '42 King street', 'London', 'Ontario', 'Canada', 'N1E2Y4', 'oly@gmail.com', '27873781', '442929', '1978-03-02', 'Resident', 'Male');
INSERT INTO `jobSeekers` (`firstName`, `lastName`, `street`, `city`, `province`, `country`, `postalCode`, `email`, `phone`, `sin`, `DOB`, `status`, `gender`) VALUES ('Maya', 'Daniel', '33 Queen Street', 'Cambridge', 'Ontario', 'Canada', 'N2D7W8', 'maya@gmail.com', '3344222', '333442', '1991-06-13', 'Resident', 'Female');
INSERT INTO `jobSeekers` (`firstName`, `lastName`, `street`, `city`, `province`, `country`, `postalCode`, `email`, `phone`, `sin`, `DOB`, `status`, `gender`) VALUES ('Jon', 'Stark', '21 Snow Street', 'Kitchener', 'Ontario', 'Canada', 'N2F3J3', 'arya@gmail.com', '3329949', '939391', '1977-01-21', 'Student', 'Male');
INSERT INTO `jobSeekers` (`firstName`, `lastName`, `street`, `city`, `province`, `country`, `postalCode`, `email`, `phone`, `sin`, `DOB`, `status`, `gender`) VALUES ('Oliver', 'Michael', '3 River Road', 'Waterloo', 'Ontario', 'Canada', 'N2E3T3', 'oliver@yahoo.com', '442232', '333424', '1990-04-03', 'Student', 'Male');


INSERT INTO `jobTypes` (`description`, `internalCode`) VALUES ('Full-time', 'FULL_TIME');
INSERT INTO `jobTypes` (`description`, `internalCode`) VALUES ('Part-time', 'PART_TIME');
INSERT INTO `jobTypes` (`description`, `internalCode`) VALUES ('Temporary', 'TEMPORARY');
INSERT INTO `jobTypes` (`description`, `internalCode`) VALUES ('contract', 'CONTRACT');
INSERT INTO `jobTypes` (`description`, `internalCode`) VALUES ('Commission', 'COMMISSION');


INSERT INTO `jobCategories` (`description`, `internalCode`) VALUES ('General Labour', 'GENERAL_LABOUR');
INSERT INTO `jobCategories` (`description`, `internalCode`) VALUES ('Construction Worker', 'CONSTRUCTION_WORKER');
INSERT INTO `jobCategories` (`description`, `internalCode`) VALUES ('Warehouse Helper', 'WAREHOUSE_HELPER');
INSERT INTO `jobCategories` (`description`, `internalCode`) VALUES ('Forklift Driver', 'FORKLIFT_DRIVER');


INSERT INTO `jobs` (`employerId`, `title`, `jobTypeId`, `street`, `city`, `postalCode`, `startDate`, `endDate`, `startTime`, `endTime`, `wage`, `description`, `postDate`, `expiryDate`, `status`, `jobCategoryId`) VALUES ('1', 'General Labour', '1', '12 New Village', 'Kitchener', 'N2A2N3', '2017-07-20', '2017-07-25', '08:00:00', '17:00:00', '14.00', '<ul><li>Working with team members in egg collection</li><li>Completing general barn duties such as feeding and bedding</li><li>Maintaining barn and all equipment</li><li>Ability to handle moderate to heavy physical work</li><li>Must be able to work in a fast-paced environment; work under pressure</li></ul>', '2017-07-01', '2017-07-19', 'true', '1');
INSERT INTO `jobs` (`employerId`, `title`, `jobTypeId`, `street`, `city`, `postalCode`, `startDate`, `endDate`, `startTime`, `endTime`, `wage`, `description`, `postDate`, `expiryDate`, `status`, `jobCategoryId`) VALUES ('2', 'Order Picker/Packer', '2', '21 Blue Street', 'Cambridge', 'N3R2T3', '2017-07-25', '2017-08-06', '07:00:00', '16:00:00', '18.00', '<p><b>Wages</b> : Forklift Wages <b>$14.00-$16.00</b> per hour, General Labourers Wages <b>$12.00-$14.50</b> per hour</p>\n<ul><li>Recent experience on any of the following: counter balance, reach, power pallet jack, walkie.</li><li>Be able lift up to 50 pounds</li><li>Own a pair of CSA approved steel toe boots</li></ul>', '2017-07-05', '2017-07-14', 'true', '2');

INSERT INTO `jobs` (`employerId`, `title`, `jobTypeId`, `street`, `city`, `postalCode`, `startDate`, `endDate`, `startTime`, `endTime`, `wage`, `description`, `postDate`, `expiryDate`, `status`, `jobCategoryId`) VALUES ('3', 'Production Associate - CNC Machining', '2', '45 King Street', 'Waterloo', 'N2D3F4', '2017-07-20', '2017-07-25', '08:00:00', '17:00:00', '21.00', '<ul><li>Provide information and assist customers with fishing and reviewing the rules that are applicable at the Lyndon Fishing Pond facility.</li><li>Ensure that safety is paramount regarding fish and lawn care equipment handling.</li><li>Determine ground maintenance requirements and assist in upkeep of grounds as required.</li><li>Assist in all areas of operation of Lyndon Fishing Pond facilities and the hatchery as needed.</li><li>Perform various tasks such as feeding and be comfortable with handling and cleaning fish.</li><li>As situations arise, flexibility in hours may be required with consultation of management.</li><li>Help to promote and market for an increase in sales and to drive new customer growth.</li></ul>', '2017-07-01', '2017-07-19', 'true', '2');
INSERT INTO `jobs` (`employerId`, `title`, `jobTypeId`, `street`, `city`, `postalCode`, `startDate`, `endDate`, `startTime`, `endTime`, `wage`, `description`, `postDate`, `expiryDate`, `status`, `jobCategoryId`) VALUES ('4', 'Construction Labourer', '3', '55 Ontario Road', 'Kitchener', 'N2M3E3', '2017-07-25', '2017-08-06', '07:00:00', '16:00:00', '19.00', '<ul><li>Exceptional Customer Service and Sales</li><li>Communication</li><li>Time Management Skills</li><li>Energetic with Good Stress Tolerance</li><li>Team Work</li><li>Attention to Detail and Problem Solving</li><li>Work with Attention to Safety</li><li>Accountability and Dependability</li><li>Operating Lawn Care Equipment</li></ul>', '2017-07-05', '2017-07-14', 'true', '2');


INSERT INTO `jobSeekerTokens` (`token`, `jobSeekerId`) VALUES ('4sd34oo2einknknkdnwk', '1');
INSERT INTO `jobSeekerTokens` (`token`, `jobSeekerId`) VALUES ('4sd34oo2einkwqqnknkdnwk', '2');
INSERT INTO `jobSeekerTokens` (`token`, `jobSeekerId`) VALUES ('4sd34oo2eddinknknkdnwk', '3');
INSERT INTO `jobSeekerTokens` (`token`, `jobSeekerId`) VALUES ('4sd34oo2qqeeinknknkdnwk', '4');

INSERT INTO `jobApplicationStatuses` (`description`, `internalCode`) VALUES ('Applied', 'APPLIED');
INSERT INTO `jobApplicationStatuses` (`description`, `internalCode`) VALUES ('Approved By Employer', 'APPROVED_BY_EMPLOYER');
INSERT INTO `jobApplicationStatuses` (`description`, `internalCode`) VALUES ('Denied By Employer', 'DENIED');
INSERT INTO `jobApplicationStatuses` (`description`, `internalCode`) VALUES ('Cancelled By User', 'CANCELLED_BY_USER');
INSERT INTO `jobApplicationStatuses` (`description`, `internalCode`) VALUES ('Cancelled By Employer', 'CANCELLED_BY_EMPLOYER');

INSERT INTO `jobApplications` (`jobApplicationStatusId`, `appliedOn`, `employerId`, `jobId`, `jobSeekerId`) VALUES ('1', '2017-07-01', '1', '1', '1');
INSERT INTO `jobApplications` (`jobApplicationStatusId`, `appliedOn`, `employerId`, `jobId`, `jobSeekerId`) VALUES ('2', '2017-06-30', '2', '2', '2');
INSERT INTO `jobApplications` (`jobApplicationStatusId`, `appliedOn`, `employerId`, `jobId`, `jobSeekerId`) VALUES ('1', '2017-06-25', '3', '3', '3');
INSERT INTO `jobApplications` (`jobApplicationStatusId`, `appliedOn`, `employerId`, `jobId`, `jobSeekerId`) VALUES ('2', '2017-06-29', '4', '4', '4');

INSERT INTO `topicGroups` (`description`, `internalCode`) VALUES ('Distance', 'DISTANCE');
INSERT INTO `topicGroups` (`description`, `internalCode`) VALUES ('Job Tpe', 'JOB_TYPE');
INSERT INTO `topicGroups` (`description`, `internalCode`) VALUES ('City', 'CITY');
INSERT INTO `topicGroups` (`description`, `internalCode`) VALUES ('Company', 'COMPANY');


INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('5 Kms', '5_KMS', '1');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('10 Kms', '10_KMS', '1');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('25 Kms', '10_KMS', '1');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('50 Kms', '50 KMS', '1');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Full Type', 'FULL_TIME', '2');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Part Type', 'PART_TIME', '2');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Contract', 'CONTRACT', '2');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Kitchener', 'KITCHENER', '3');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Waterloo', 'WATERLOO', '3');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Cambridge', 'CAMBRIDGE', '3');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Black Smith', 'BLACK_SMITH', '4');
INSERT INTO `topics` (`description`, `internalCode`, `topicGroupId`) VALUES ('Bock Tools', 'BOCK_TOOLS', '4');


UPDATE `jobs` SET `views`='120', `totalPositions`='20', `filledPositions`='3' WHERE `id`='1';
UPDATE `jobs` SET `views`='123', `totalPositions`='14', `filledPositions`='1' WHERE `id`='2';
UPDATE `jobs` SET `views`='132', `totalPositions`='24', `filledPositions`='3' WHERE `id`='3';
UPDATE `jobs` SET `views`='121', `totalPositions`='11', `filledPositions`='0' WHERE `id`='4';

UPDATE `jobs` SET `province`='Ontario', `country`='Canada' WHERE `id`='1';
UPDATE `jobs` SET `province`='Ontario', `country`='Canada' WHERE `id`='2';
UPDATE `jobs` SET `province`='Ontario', `country`='Canada' WHERE `id`='3';
UPDATE `jobs` SET `province`='Ontario', `country`='Canada' WHERE `id`='4';



INSERT INTO `klvbr8oj6g21j61r`.`jobSeekerSubscriptions`
(`topicId`,`jobSeekerId`,`status`)
VALUES
('1','1','1'),
('2','1','1'),
('3','2','1'),
('2','2','1');


INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '1', '1');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '1', '2');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('0', '1', '3');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '1', '4');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '2', '1');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '2', '2');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('0', '2', '3');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '2', '4');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '3', '1');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('1', '3', '2');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('0', '3', '3');
INSERT INTO `klvbr8oj6g21j61r`.`jobRatings` (`status`, `jobId`, `jobSeekerId`) VALUES ('0', '3', '4');