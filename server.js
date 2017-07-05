/*
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// all environments

var app = express();

app.set('ip_address',process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'); //OPENSHIFT_NODEJS_IP = '127.0.0.1 and Heroku IP = '0.0.0.0'
app.set('port',process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080); //var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.disable('etag');


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
var jobSeekerApplication = require('./routes/jobSeekerApplication');
var jobApplicants = require('./routes/jobApplicants');
var jobSeekerTokens = require('./routes/jobSeekerTokens');
var jobTypes = require('./routes/jobTypes');
var jobCategories = require('./routes/jobCategories');
var topicGroups = require('./routes/topicGroups');
var topics = require('./routes/topics');
var jobSeekerSubscriptions = require('./routes/jobSeekerSubscriptions');
var jobApplicationStatuses = require('./routes/jobApplicationStatuses');

//Notification
var sendNotifications = require('./routes/sendFcmNotification');
var fcm = require('./fcm/sendFcmNotification');
var fcm2 = require('./fcm/sendFcmJobs');
var fcm3 = require('./fcm/sendFcmApplyStatus');


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
app.post('/jobs/view',jobs.view);

app.get('/jobApplications', jobApplications.list);
app.get('/jobApplications/:id', jobApplications.list);
app.post('/jobApplications/add', jobApplications.add);
app.post('/jobApplications/update', jobApplications.update);
app.post('/jobApplications/delete', jobApplications.delete);

app.get('/jobSeekerApplication', jobSeekerApplication.list);
app.get('/jobSeekerApplication/:id', jobSeekerApplication.list);

app.get('/jobApplicants',jobApplicants.list);
app.get('/jobApplicants/:id',jobApplicants.list);
app.post('/jobApplicants/update',jobApplicants.update);

app.get('/jobSeekerTokens', jobSeekerTokens.list);
app.get('/jobSeekerTokens/:id', jobSeekerTokens.list);
app.post('/jobSeekerTokens/add', jobSeekerTokens.add);
app.post('/jobSeekerTokens/update', jobSeekerTokens.update);
app.post('/jobSeekerTokens/delete', jobSeekerTokens.delete);

app.get('/jobTypes', jobTypes.list);
app.get('/jobTypes/:id', jobTypes.list);
app.get('/jobCategories', jobCategories.list);
app.get('/jobCategories/:id', jobCategories.list);


app.get('/topicGroups',topicGroups.list);
app.get('/topicGroups/:id', topicGroups.list);
app.post('/topicGroups/add', topicGroups.add);
app.post('/topicGroups/update', topicGroups.update);
app.post('/topicGroups/delete', topicGroups.delete);


app.get('/topics',topics.list);
app.get('/topics/:id', topics.list);
app.post('/topics/add', topics.add);
app.post('/topics/update', topics.update);
app.post('/topics/delete', topics.delete);

app.get('/jobSeekerSubscriptions',jobSeekerSubscriptions.list);
app.get('/jobSeekerSubscriptions/:id',jobSeekerSubscriptions.list);
app.post('/jobSeekerSubscriptions/add',jobSeekerSubscriptions.add);
app.post('/jobSeekerSubscriptions/update',jobSeekerSubscriptions.update);
app.post('/jobSeekerSubscriptions/delete',jobSeekerSubscriptions.delete);

app.get('/jobApplicationStatuses',jobApplicationStatuses.list);

//send push message by Moonsun - 
app.get('/fcm/sendFcmNotification', fcm.send);

app.get('/fcm/sendFcmJobs', fcm2.send);
app.get('/fcm/sendFcmApplyStatus', fcm3.send);
//send push message
app.get('/sendNotification', sendNotifications.send);
//app.post('/sendNotification/add'.jobSeekerTokens.add);
//app.post('/sendNotification/delete', jobSeekerTokens.delete);
//app.post('/sendNotification/all',jobSeekerTokens.all);

app.use(app.router);

var server = http.createServer(app);

server.listen(app.get('port'), app.get('ip_address'), function(){
  console.log('Server ' + app.get('ip_address') + ' as Express server listening on port ' + app.get('port'));
});
