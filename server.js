/*
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse json encoded bodies

app.use(bodyParser.json({ type: 'application/*+json' }));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//load route
var employers = require('./routes/employers');
var jobSeekers = require('./routes/jobSeekers');
var jobs = require('./routes/jobs');
var jobApplications = require('./routes/jobApplications');
var userTokens = require('./routes/userTokens');
var jobTypes = require('./routes/jobTypes');
var jobCategories = require('./routes/jobCategories');

//Notification
var sendNotifications = require('./routes/sendFcmNotification');
var fcm = require('./fcm/sendFcmNotification');
var fcm2 = require('./fcm/sendFcmJobs');



var connection = require('express-myconnection');
var mysql = require('mysql');

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

/*app.use(
    connection(mysql, {

        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306, //port mysql
        database: 'jobbridge'

    }, 'pool') //or single
);*/

app.get('/', routes.index);

app.get('/employers', employers.list);
app.get('/employers/:id', employers.list);
app.post('/employers/add', employers.add);
app.post('/employers/update', employers.update);
app.post('/employers/delete', employers.delete);

app.get('/jobSeekers', jobSeekers.list);
app.get('/jobSeekers/:id', jobSeekers.list);
app.post('/jobSeekers/add', jobSeekers.add);
app.post('/jobSeekers/update', jobSeekers.update);
app.post('/jobSeekers/delete', jobSeekers.delete);

app.get('/jobs', jobs.list);
app.get('/jobs/:id', jobs.list);
app.post('/jobs/add', jobs.add);
app.post('/jobs/update', jobs.update);
app.post('/jobs/delete', jobs.delete);

app.get('/jobApplications', jobApplications.list);
app.get('/jobApplications/:id', jobApplications.list);
app.post('/jobApplications/add', jobApplications.add);
app.post('/jobApplications/update', jobApplications.update);
app.post('/jobApplications/delete', jobApplications.delete);

app.get('/userTokens', userTokens.list);
app.get('/userTokens/:id', userTokens.list);
app.post('/userTokens/add', userTokens.add);
app.post('/userTokens/update', userTokens.update);
app.post('/userTokens/delete', userTokens.delete);

app.get('/jobTypes', jobTypes.list);
app.get('/jobTypes/:id', jobTypes.list);
app.get('/jobCategories', jobCategories.list);
app.get('/jobCategories/:id', jobCategories.list);

//send push message by Moonsun - 
app.get('/fcm/sendFcmNotification', fcm.send);


app.get('/fcm/sendFcmJobs', fcm2.send);
//send push message
app.get('/sendNotification', sendNotifications.send);
//app.post('/sendNotification/add'.userTokens.add);
//app.post('/sendNotification/delete', userTokens.delete);
//app.post('/sendNotification/all',userTokens.all);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
