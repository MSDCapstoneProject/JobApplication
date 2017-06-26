
/**
 * Module dependencies.
 */

//mongodb://heroku_fsp79d18:ihq88i509ek7m1rks5kal6muj6@ds131119.mlab.com:31119/heroku_fsp79d18

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var serveIndex = require('serve-index');

//load route
var aboutUs = require('./routes/aboutUs');
var contactUs = require('./routes/contactUs');
var products = require('./routes/products');

var customers = require('./routes/customers'); 
var employers = require('./routes/employers');

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments

app.set('ip_address',process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'); //OPENSHIFT_NODEJS_IP = '127.0.0.1 and Heroku IP = '0.0.0.0'
app.set('port',process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080); //var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images/products/RUBBER_MOULDED_PARTS', express.static(__dirname + '/public/images/products/RUBBER_MOULDED_PARTS'));

app.use('/images/products/RUBBER_MOULDED_PARTS', serveIndex(__dirname + '/public/images/products/RUBBER_MOULDED_PARTS'));

app.use('/images/products/SS_FASTENERS', express.static(__dirname + '/public/images/products/SS_FASTENERS'));

app.use('/images/products/SS_FASTENERS', serveIndex(__dirname + '/public/images/products/SS_FASTENERS'));


app.use('/images/products/SS_PIPE_FITTINGS', express.static(__dirname + '/public/images/products/SS_PIPE_FITTINGS'));

app.use('/images/products/SS_PIPE_FITTINGS', serveIndex(__dirname + '/public/images/products/SS_PIPE_FITTINGS'));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodejs'

    },'pool') //or single
);



app.get('/', routes.index);

app.get('/aboutUs',aboutUs.main);
app.get('/contactUs',contactUs.main);
app.get('/products',products.main);

//not required currently
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);



app.use(app.router);

var server = http.createServer(app);

server.listen(app.get('port'), app.get('ip_address'), function(){
  console.log('Server ' + app.get('ip_address') + ' as Express server listening on port ' + app.get('port'));
});