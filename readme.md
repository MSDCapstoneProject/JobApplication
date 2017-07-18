This is a very basic example of CRUD in Node.js n mySQL.

## Installation
*for newbies : Clone or download zip to your machine then hit this :

	npm install

## Database Creation script
        run Setup/db_create.sql at mysql query editor

## Configuration (database)
app.js

        host: 'localhost',
        user: 'root',
        password : '',//root password of mysql
        port : 3306, //port mysql
        database:'jobbridge'	

config.json
    "development": {
        "urlPath": "/",
        "username": "root",
        "password": "",
        "database": "jobbridge",
        "host": "localhost",
        "port": 3306,
        "forceUpdate": false,
        "dialect": "mysql",
        "dialectOptions": {
        "instanceName": "MySQL57" /* Depending upon your mysql version */
        }

## Running Application
        start node.js server application
        visit : http://localhost:3000

        Status Values ---->
        status = {
    SUCCESS: 1,
    NOT_SIGNED_IN: 2,
    AUTHORIZATION_FAIL: 3,
    UNKNOWN_REQUEST: 4,
    EXCEPTION: 5,
    NO_DATA_FOUND:6,
    DATA_FULL:7
};

        Jobseeker Operation ---->

        Employer get for all: http://localhost:3000/employers
        Employer get for id: http://localhost:3000/employers?id=1 or http://localhost:3000/employers/1 
        Employer post add employer : http://localhost:8080/employers/add

            {
        "name": "Trinity Metals",
        "email": "jobs@trinitymetals.com",
        "phone": "233920004",
        "website": "http://www.trinitymetals.com",
        "street": "32 Pearson Street",
        "city": "Kitchener",
        "province": "Ontario",
        "country": "Canada",
        "postalCode": "N2K4E4"
    }

        Employer post edit employer : http://localhost:8080/employers/update

            {
    	"id": "42",
        "name": "Trinity Metals Ltd",
        "email": "jobs@trinitymetals.com",
        "phone": "233920004",
        "website": "http://www.trinitymetals.com",
        "street": "32 Pearson Street",
        "city": "Kitchener",
        "province": "Ontario",
        "country": "Canada",
        "postalCode": "N2K4E4"
    }



        Employer post delete an existing employer : http://localhost:8080/employers/delete

            {
    	"id": "42"
    }

        Jobseeker Operation ----> 

        JobSeeker get for all: http://localhost:3000/jobSeekers
        JobSeeker get for id: http://localhost:3000/jobSeekers?id=1 or http://localhost:3000/jobSeekers/1
        JobSeeker Add: http://localhost:3000/employers/update?name=Dell &address=new London&email=jobs@skywheel.com&phone=44224555&website=http://www.skywheel.com
        JobSeeker Update: http://localhost:3000/jobSeekers/update?firstName=Timmy&lastName=Lim&address=New York&email=Joy@gmail.com&phone=4424555&sin=33455553&DOB=1987-09-09&status=Student&gender=male&id=5
        JobSeeker delete: http://localhost:3000/jobSeekers/delete?id=4

        Jobs Operation ----->

        Jobs get for all: http://localhost:3000/jobs
        Jobs get for id: http://localhost:3000/jobs?id=1 or http://localhost:3000/jobs/1
        Jobs Add: http://localhost:3000/jobs/add

    {
        "title": "General Labour/Picker",
        "street": "18 Sun Street",
        "city": "Kitchener",
        "province": "Ontario",
        "country": "Canada",
        "startDate": "2017-07-10",
        "endDate": "2017-08-25",
        "startTime": "08:00:00",
        "endTime": "17:00:00",
        "wage": "16.00",
        "description": "<ul><li>Working with team members in egg collection</li><li>Completing general barn duties such as feeding and bedding</li><li>Maintaining barn and all equipment</li><li>Ability to handle moderate to heavy physical work</li><li>Must be able to work in a fast-paced environment; work under pressure</li></ul>",
        "postDate": "2017-07-01",
        "expiryDate": "2017-07-19",
        "status": true,
        "views": 126,
        "totalPositions": 20,
        "filledPositions": 5,
        "employerId": 2,
        "jobTypeId": 2,
        "jobCategoryId": 2,
        "totalApplications": 10
    }

        Jobs Update: http://localhost:8080/jobs/update

    {
    	"id": "82",
        "title": "General Labour/Picker",
        "street": "18 Sun Street",
        "city": "Kitchener",
        "province": "Ontario",
        "country": "Canada",
        "startDate": "2017-07-10",
        "endDate": "2017-08-25",
        "startTime": "08:00:00",
        "endTime": "17:00:00",
        "wage": "16.00",
        "description": "<ul><li>Working with team members in egg collection</li><li>Completing general barn duties such as feeding and bedding</li><li>Maintaining barn and all equipment</li><li>Ability to handle moderate to heavy physical work</li><li>Must be able to work in a fast-paced environment; work under pressure</li></ul>",
        "postDate": "2017-07-01",
        "expiryDate": "2017-07-19",
        "status": true,
        "totalPositions": 20,
        "employerId": 2,
        "jobTypeId": 2,
        "jobCategoryId": 2
    }

        Jobs Delete: http://localhost:3000/jobs/delete

        {
                "id": "82"
        }

        Jobs View POST: http://localhost:3000/jobs/view

                Json = {
                                "jobId": "29"
                        }

                

jobSeekerSubscriptions Operation ----->

       // ---JobSubscribers get for all: http://localhost:8080/jobSeekerSubscriptions 

        jobSeekerSubscriptions get for  id: http://localhost:8080/jobSeekerSubscriptions?jobSeekerId=1 -- need all jobs for job seeker id then return need all jobs

        //jobSeeker 


        JobSubscribers Post Add:http://localhost:8080/jobSeekerSubscriptions/add

                Json  =         {
                                "jobSeekerId": "1",
                                "topicId": "['5','6']"
                                }

        JobSubscribers Post update: http://localhost:8080/jobSeekerSubscriptions/update

                Json  =         {
                                "id": "1",
                                "jobSeekerId": "1",
                                "topicId": "2",
                                "status": true //true: subscribed and false: un-subscribed
                                }

        JobSubscribers Post Delete: http://localhost:8080/jobSeekerSubscriptions/delete

                Json  =         {
                                "id": "1"
                                }


JobSeekerTokens Operation ----->

        JobSeekerTokens get for all: http://localhost:3000/jobSeekerTokens

        JobSeekerTokens get for id: http://localhost:3000/jobSeekerTokens/1

        JobSeekerTokens Post Add: http://localhost:3000/jobSeekerTokens/add

                Json  =         {
                                "token": "1y766yui988876",
                                "jobSeekersId": "1"
                                }

        JobSeekerTokens Post Delete: http://localhost:3000/jobSubscribers/delete

                Json  =         {
                                 "token": "1y766yui988876"
                                }


Job Types Operation ----->

        Job Types get for all: http://localhost:3000/jobTypes

        Job Types get for id: http://localhost:3000/jobTypes/1

Job Applicants Operation for Employer----->

        job Applicants get for only single job : http://localhost:8080/jobApplicants?jobId=2
        for jobApplication id: http://localhost:8080/jobApplicants?jobApplicationId=1


        job Applicants post (change single jobApplication) : http://localhost:3000/jobApplicants/update

        JSON =  {	
                	"id" : "1",
	                "status" : "Approved"
                }

        jobApplicationStatuses
'1', 'Applied'
'2', 'Approved By Employer'
'3', 'Denied By Employer'
'4', 'Cancelled By User'
'5', 'Cancelled By Employer'



Job Applications Operation for JobSeekers :

        Job Applications Get 1. http://localhost:8080/jobApplications?jobApplicationId=28
                        2. http://localhost:8080/jobApplications?jobSeekerId=3

       Job Application Add - http://localhost:3000/jobApplications/add
       Json = {
            "employerId": "1",
            "jobId":"4",
            "jobSeekerId": "2"
        }

        Job Application update : http://localhost:3000/jobApplications/update

        //if application cancelled by user
        Json -     {
            "applicationStatus": "Cancelled",                      // 'Cancelled By User'
            "employerId": "1",
            "jobId":"7",
            "jobSeekerId": "8",
            "jobApplicationId": "36"
        }
        
        //If job application is not cancelled but updated with other fields
        Json -  {                   
            "employerId": "1",
            "jobId":"7",
            "jobSeekerId": "8",
            "jobApplicationId": "36"
        }



        Job Application delete : http://localhost:3000/jobApplications/delete

        Json - {
			"jobApplicationId" : "28",
                }

JobSeeker Application Method:

        Get Method : http://localhost:3000/jobSeekerApplication/30

        or for all : http://localhost:3000/jobSeekerApplication


Topic Groups method

        Get Method: http://localhost:8080/topicGroups/1
        for all   : http://localhost:8080/topicGroups
        
        add method: http://localhost:8080/topicGroups/add
        JSON =   {
                "description": "Job Type"
        }

        update method: http://localhost:8080/topicGroups/update
        JSON =   {
                "id": "1",
                "description": "Job Types"
        }

        delete method: http://localhost:8080/topicGroups/delete
        JSON = {
                "id": "10"
        }


Topics method

        Get Method: http://localhost:8080/topics/1
        for all   : http://localhost:8080/topics
        
        add method: http://localhost:8080/topics/add
        JSON =   {
                "description": "Part Time",
                "topicGroupId": "1"
        }

        update method: http://localhost:8080/topics/update
        JSON =   {
                "id": "1",
                "description": "Part-Time",
                "topicGroupId": "1"
        }

        delete method: http://localhost:8080/topics/delete
        JSON = {
                "id": "10"
        }


-- Operations for JobApplicationStatuses

                To get all : - http://localhost:8080/jobApplicationStatuses
                To get for id: - http://localhost:8080/jobApplicationStatuses?id=1


-- Operations for JobRatings

        To get all: - http://localhost:8080/jobRatings
        To get job Ratings id : - http://localhost:8080/jobRatings?id=1
        To get jobSeeker id : - http://localhost:8080/jobRatings?jobSeekerId=1


        To add: - http://localhost:8080/jobRatings/add

        {
	        "status": "1",
	        "jobId": "1",
	        "jobSeekerId": "1"
        }

        To update: - http://localhost:8080/jobRatings/update

        {
                "id": "1",
	        "status": "0",
	        "jobId": "1",
	        "jobSeekerId": "1"
        }

        To Delete: - http://localhost:8080/jobRatings/delete

        {
                "id": "1"
        }


-- Statistics Method

       Jobs By City Get Method http://localhost:8080/statistics/jobsByCity?employerId=2&year=2017&month=7

       Jobs By JobType Get Method http://localhost:8080/statistics/jobsByJobType?employerId=2&year=2017&month=7

       Jobs By JobCategory Get Method http://localhost:8080/statistics/jobsByJobCategory?employerId=2&year=2017&month=7

               
## NOTES