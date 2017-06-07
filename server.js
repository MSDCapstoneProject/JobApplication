/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load route
var employers = require('./routes/employers');
var jobSeekers = require('./routes/jobSeekers');
var jobs = require('./routes/jobs');
var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    connection(mysql, {

        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306, //port mysql
        database: 'jobbridge'

    }, 'pool') //or single
);


/*
app.get('/', routes.index);

app.get('/employers', employers.get);
app.post('/employers', employers.post);

app.get('/jobSeekers',jobSeekers.get);
app.post('/jobSeekers', jobSeekers.post);

app.use(app.router);

*/

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

app.get('/jobs',jobs.list);
app.get('/jobs/:id',jobs.list);
app.post('/jobs/add',jobs.add);
app.post('/jobs/update', jobs.update);
app.post('/jobs/delete', jobs.delete);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
