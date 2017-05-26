/*
 * GET users listing.
 */

var db = require('../models');
var status = require('./resStatus');

var response = {};

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM jobseekers',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('jobseekers',{page_title:"JobSeekers",data:rows});

         });
         //console.log(query.sql);
    });
  
};

/*Save the candidate*/
exports.save = function(req,res){
    var postData = req.body;
    respone ={};
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone,
        };
        
        var query = connection.query("INSERT INTO jobseekers set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );

        response.status = status.SUCCESS;

        //send status as success.
        res.json({ response });
        });
    
    });

        var postData = req.body; //read the post request JSON
        var JobSeekerData = {
            firstName : postData.firstName,
            lastName : postData.lastName,
            address : postData.address,
            email : postData.email,
            phone : postData.phone,
            sin : postData.sin,
            DOB : postData.DOB,
            status : postData.status,
            gender : postData.gender
        }

    if (postData.method == "addJobSeeker") {

    }
        response = {};
        Promise.resolve()
            .then(function () {
                return db.JobSeeker.
            })
            .then(function (employers) {
                response.employee = [];
                employers.forEach(function(employee) {
                 response.employee.push(employee.dataValues);   
                });
                response.status = status.SUCCESS;
                res.json({ response });
            })
            .catch(function (err) {
                console.log('Error at employerSearch ' + err);
            })
    
};