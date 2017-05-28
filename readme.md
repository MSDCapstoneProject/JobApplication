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

        Employer get: http://localhost:3000/employers?id=1
        Employer post search : http://localhost:3000/employers?name=bock&method=searchEmployer
        Employer post create a new employer : http://localhost:3000/employers?method=saveEmployer&name=Sky Wheels&address=new London&email=jobs@skywheel.com&phone=44224555&website=http://www.skywheel.com

        Employer post update an existing employer : http://localhost:3000/employers?method=editEmployer&name=Sky Wheels&address=Kitchener&email=jobs@skywheel.com&phone=44224555&website=http://www.skywheel.com&id=3

        Employer post delete an existing employer : http://localhost:3000/employers?method=deleteEmployer&id=2

        same for jobseeker // 

        NOTE:- Currently update needs all the fields
	
You're gonna need to create a DB named 'nodejs' and import customer.sql

## NOTES