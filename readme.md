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

        Jobseeker Operation ---->

        Employer get for all: http://localhost:3000/employers
        Employer get for id: http://localhost:3000/employers?id=1 or http://localhost:3000/employers/1 
        Employer post add employer : http://localhost:3000/employers/update?name=Dell &address=new London&email=jobs@skywheel.com&phone=44224555&website=http://www.skywheel.com
        Employer post delete an existing employer : http://localhost:3000/employers/delete?id=1

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
        "title": "General Labour",
        "jobLocation": "Ottawa, ON",
        "startDate": "2017-07-21T00:00:00.000Z",
        "endDate": "2017-07-29T00:00:00.000Z",
        "startTime": "08:00:00",
        "endTime": "17:00:00",
        "wage": 12,
        "description": "New Labour Job",
        "postDate": "2017-07-11T00:00:00.000Z",
        "expiryDate": "2017-07-21T00:00:00.000Z",
        "status": true,
        "employerId": 2,
        "jobTypeId": 2,
        "jobCategoryId": 2,
        "totalPositions": 10
        }

        Jobs Update: http://localhost:3000/jobs/update

        {	
        "title": "General Labour",
        "jobLocation": "Ottawa, ON",
        "startDate": "2017-07-21T00:00:00.000Z",
        "endDate": "2017-07-29T00:00:00.000Z",
        "startTime": "08:00:00",
        "endTime": "17:00:00",
        "wage": 12,
        "description": "New Labour Job",
        "postDate": "2017-07-11T00:00:00.000Z",
        "expiryDate": "2017-07-21T00:00:00.000Z",
        "status": true,
        "employerId": 2,
        "jobTypeId": 2,
        "jobCategoryId": 2,
        "totalPositions": 10
        }

        Jobs Delete: http://localhost:3000/jobs/delete/?id=1

        Jobs View POST: http://localhost:3000/jobs/view

                Json = {
                                "jobId": "29"
                        }

                

JobSubscribers Operation -----> JobSubscribers to jobApplications

       // ---JobSubscribers get for all: http://localhost:3000/jobSubscribers  

        JobSubscribers get for id: http://localhost:3000/jobSubscribers/1 -- need all jobs for job seeker id then return need all jobs

        //jobSeeker 


        JobSubscribers Post Add: http://localhost:3000/jobSubscribers/add

                Json  =         {
                                "EmployerId": "1",
                                "JobId":"1",
                                "JobSeekerId": "1"
                                }

        JobSubscribers Post update: http://localhost:3000/jobSubscribers/update

                Json  =         {
                                "id": "1"
                                "EmployerId": "1",
                                "JobId":"3",
                                "JobSeekerId": "1"
                                }

        JobSubscribers Post Delete: http://localhost:3000/jobSubscribers/delete

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

Job Applicants Opearion for Employer----->

        job Applicants get for only single employer: http://localhost:3000/jobApplicants/1

        job Applicants post (change single jobApplication) : http://localhost:3000/jobApplicants/update

        JSON =  {	
	                "jobApplicationId" : "1",
	                "applicationStatus" : "accepted"
                }

        applicationStatus Types = denied, canceled, applied, accepted


Job Applications Operation for JobSeekers :

        Job Applications Get 1. http://localhost:8080/jobApplications?jobApplicationId=28
                        2. http://localhost:8080/jobApplications?jobSeekerId=3

       Job Application Add - http://localhost:3000/jobApplications/add
       Json = {
            "appliedOn": "2017-06-14",
            "EmployerId": "1",
            "JobId":"4",
            "JobSeekerId": "2"
        }

        Job Application update : http://localhost:3000/jobApplications/update

        Json - {
        "jobApplicationId" : "28",
            "applicationStatus": "canceled",
            "EmployerId": "2",
            "JobId": "4",
            "JobSeekerId": "3"
        } //if application canceled by jobSeeker then change status to canceled

        Job Application delete : http://localhost:3000/jobApplications/delete

        Json - {
			"jobApplicationId" : "28",
                }

JobSeeker Application Method:

        Get Method ; http://localhost:3000/jobSeekerApplication/30

        or for all : http://localhost:3000/jobSeekerApplication

## NOTES