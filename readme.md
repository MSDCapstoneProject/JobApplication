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
        "jobCategoryId": 2
        }

        Jobs Update: http://localhost:3000/jobs/update/?id=10&title=General Farm Labourer&jobLocation=St. George, ON&startDate=2017-07-20&endDate=2017-07-29&startTime=09:30:00&endTime=17:00:00&wage=16.22&description=You will have the opportunity for personal development through on the job training, continuing education, industry programs and challenging work. Our company offers sponsored health benefits, incentives plans for you and your family in a fun and inviting team based environment.We have been in business for more than 60 years and over that time have grown into the world’s leader in turkey and laying hen genetics with the Hybrid, Shaver, and Bovans portfolio of products.&postDate=2017-07-10&expiryDate=2017-07-19&status=true&employerId=2&jobTypeId=2&jobCategoryId=2

        Jobs Delete: http://localhost:3000/jobs/delete/?id=1

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


UserTokens Operation ----->

        UserTokens get for all: http://localhost:3000/userTokens

        UserTokens get for id: http://localhost:3000/userTokens/1

        UserTokens Post Add: http://localhost:3000/userTokens/add

                Json  =         {
                                "token": "1y766yui988876"
                                }

        JobSubscribers Post Delete: http://localhost:3000/jobSubscribers/delete

                Json  =         {
                                "id": "1" // need to find token
                                }


Job Types Operation ----->

        Job Types get for all: http://localhost:3000/jobTypes

        Job Types get for id: http://localhost:3000/jobTypes/1

## NOTES