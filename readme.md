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

        Jobseeker Operation // 

        Employer get for all: http://localhost:3000/employers
        Employer get for id: http://localhost:3000/employers?id=1 or http://localhost:3000/employers/1 
        Employer post add employer : http://localhost:3000/employers/update?name=Dell &address=new London&email=jobs@skywheel.com&phone=44224555&website=http://www.skywheel.com

        Employer post delete an existing employer : http://localhost:3000/employers/delete?id=1

        Jobseeker Operation // 
        JobSeeker get for all: http://localhost:3000/jobSeekers
        JobSeeker get for id: http://localhost:3000/jobSeekers?id=1 or http://localhost:3000/jobSeekers/1

        JobSeeker Add: http://localhost:3000/employers/update?name=Dell &address=new London&email=jobs@skywheel.com&phone=44224555&website=http://www.skywheel.com

        JobSeeker Update: http://localhost:3000/jobSeekers/update?firstName=Timmy&lastName=Lim&address=New York&email=Joy@gmail.com&phone=4424555&sin=33455553&DOB=1987-09-09&status=Student&gender=male&id=5

        JobSeeker delete: http://localhost:3000/jobSeekers/delete?id=4

## NOTES