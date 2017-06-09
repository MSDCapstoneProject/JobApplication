

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


INSERT INTO `Jobs` (`employerId`,`title`,`jobTypeId`,`jobLocation`,`startDate`,`endDate`,`startTime`,`endTime`,`wage`,`description`,`postDate`,`expiryDate`,`status`,`jobCategoryId`) VALUES
(2, 'Production Associate - CNC Machining',2, 'Vaughan, ON','2017-07-20','2017-07-25','08:00:00','17:00:00',14.00,"<ul><li>Provide information and assist customers with fishing and reviewing the rules that are applicable at the Lyndon Fishing Pond facility.</li><li>Ensure that safety is paramount regarding fish and lawn care equipment handling.</li><li>Determine ground maintenance requirements and assist in upkeep of grounds as required.</li><li>Assist in all areas of operation of Lyndon Fishing Pond facilities and the hatchery as needed.</li><li>Perform various tasks such as feeding and be comfortable with handling and cleaning fish.</li><li>As situations arise, flexibility in hours may be required with consultation of management.</li><li>Help to promote and market for an increase in sales and to drive new customer growth.</li></ul>", '2017-07-01','2017-07-19',1,2),
(1, 'Construction Labourer',3, 'Milton, ON','2017-07-25','2017-08-06','07:00:00','16:00:00',12.50,"<ul><li>Exceptional Customer Service and Sales</li><li>Communication</li><li>Time Management Skills</li><li>Energetic with Good Stress Tolerance</li><li>Team Work</li><li>Attention to Detail and Problem Solving</li><li>Work with Attention to Safety</li><li>Accountability and Dependability</li><li>Operating Lawn Care Equipment</li></ul>", '2017-07-05','2017-07-14',1,3);