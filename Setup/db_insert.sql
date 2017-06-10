INSERT INTO `Employers` ( `name`, `address`, `email`, `phone`,`website`) VALUES
( 'Bock Tools', '12, Cambridge','jobs@bock.com', '22678909', 'http://www.bocktools.com'),
( 'Horizon Parts', '2-A, Kitchener','jobs@horizonparts.com', '519677289','http://www.horizonparts.com');

INSERT INTO `JobSeekers` ( `firstname`,`lastName`, `address`, `email`,`phone`,`sin`,`DOB`,`status`,`gender`) VALUES
( 'Jen','Smith', 'Kitchener','jerry@gmail.com', '22293343','333422344','1990-02-12','citizen','male'),
( 'Kitty','karen', 'Waterloo','kitty@gmail.com', '4433334','4444','1980-10-03','student','female');

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

INSERT INTO `Jobs` (`employerId`,`title`,`jobTypeId`,`jobLocation`,`startDate`,`endDate`,`startTime`,`endTime`,`wage`,`description`,`postDate`,`expiryDate`,`status`,`jobCategoryId`) VALUES
(2, 'General Labour',2, 'Vaughan, ON','2017-07-20','2017-07-25','08:00:00','17:00:00',14.00,"<ul><li>Working with team members in egg collection</li><li>Completing general barn duties such as feeding and bedding</li><li>Maintaining barn and all equipment</li><li>Ability to handle moderate to heavy physical work</li><li>Must be able to work in a fast-paced environment; work under pressure</li></ul>", '2017-07-01','2017-07-19',1,2),
(1, 'Order Picker/Packer',3, 'Milton, ON','2017-07-25','2017-08-06','07:00:00','16:00:00',12.50,"<p><b>Wages</b> : Forklift Wages <b>$14.00-$16.00</b> per hour, General Labourers Wages <b>$12.00-$14.50</b> per hour</p>
<ul><li>Recent experience on any of the following: counter balance, reach, power pallet jack, walkie.</li><li>Be able lift up to 50 pounds</li><li>Own a pair of CSA approved steel toe boots</li></ul>", '2017-07-05','2017-07-14',1,3);


INSERT INTO `Jobs` (`employerId`,`title`,`jobTypeId`,`jobLocation`,`startDate`,`endDate`,`startTime`,`endTime`,`wage`,`description`,`postDate`,`expiryDate`,`status`,`jobCategoryId`) VALUES
(2, 'Production Associate - CNC Machining',2, 'Vaughan, ON','2017-07-20','2017-07-25','08:00:00','17:00:00',14.00,"<ul><li>Provide information and assist customers with fishing and reviewing the rules that are applicable at the Lyndon Fishing Pond facility.</li><li>Ensure that safety is paramount regarding fish and lawn care equipment handling.</li><li>Determine ground maintenance requirements and assist in upkeep of grounds as required.</li><li>Assist in all areas of operation of Lyndon Fishing Pond facilities and the hatchery as needed.</li><li>Perform various tasks such as feeding and be comfortable with handling and cleaning fish.</li><li>As situations arise, flexibility in hours may be required with consultation of management.</li><li>Help to promote and market for an increase in sales and to drive new customer growth.</li></ul>", '2017-07-01','2017-07-19',1,2),
(1, 'Construction Labourer',3, 'Milton, ON','2017-07-25','2017-08-06','07:00:00','16:00:00',12.50,"<ul><li>Exceptional Customer Service and Sales</li><li>Communication</li><li>Time Management Skills</li><li>Energetic with Good Stress Tolerance</li><li>Team Work</li><li>Attention to Detail and Problem Solving</li><li>Work with Attention to Safety</li><li>Accountability and Dependability</li><li>Operating Lawn Care Equipment</li></ul>", '2017-07-05','2017-07-14',1,3);