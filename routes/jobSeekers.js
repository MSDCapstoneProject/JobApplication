/*
 * GET JobSeeker.
 */

var db = require("../models");
var status = require("./resStatus");
var request = require('request');

var routes = {};
var response = {};
var method;

exports.list = function (req, res) {

    var jobSeekersId = req.query.id || req.params.id;

    Promise.resolve()
        .then(function () {
            if (jobSeekersId) {
                return db.JobSeekers.findAll({ attributes: ['id', 'firstName', 'lastName', 'address', 'email', 'phone', 'sin', 'DOB', 'status', 'gender'], where: { id: jobSeekersId } }); //if id is present
            } else {
                return db.JobSeekers.findAll({ attributes: ['id', 'firstName', 'lastName', 'address', 'email', 'phone', 'sin', 'DOB', 'status', 'gender'] }); //if id is not present
            }
        })
        .then(function (jobSeekers) {
            if (jobSeekers) {
                res.json(jobSeekers);
            }
        })
        .catch(function (err) {
            console.log("Error at jobSeekers get request" + err);
        })
}

/*
 * Post JobSeekers.
 */

exports.add = function (req, res) {
    method = "saveJobSeeker";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobSeeker";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobSeeker";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;

    if (method == "searchJobSeekers") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.JobSeekers.findAll({
                    attributes: ['id', 'firstName', 'lastName', 'address', 'email', 'phone', 'sin', 'DOB', 'status', 'gender'],
                    where: { name: { $like: "%" + postData.name + "%" } }
                }); //currently searching only through name
            })
            .then(function (jobSeekers) {
                if (jobSeekers) {
                    response.jobSeeker = [];
                    jobSeekers.forEach(function (jobSeeker) {
                        response.jobSeeker.push(jobSeeker.dataValues);
                    });
                }
                response.status = status.SUCCESS;
                res.json({ response });
            })
            .catch(function (err) {
                console.log("Error at searchJobSeekers " + err);
            })
    }
    else if (method == "saveJobSeeker") {
        response = {};

        // building json for insert
        var entry = {
            firstName: postData.firstName,
            lastName: postData.lastName,
            address: postData.address,
            email: postData.email,
            phone: postData.phone,
            sin: postData.sin,
            DOB: postData.DOB,
            status: postData.status,
            gender: postData.gender,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeekers.create(entry);   //create a record
            })
            .then(function (jobSeeker) {
                if (jobSeeker) {
                    response.name = jobSeeker.firstName;
                    //save a token information for this jobseeker
                    if(postData.token){
                        var body = {};
                        body.jobSeekersId = jobSeeker.id;
                        body.token = postData.token;

                        //send a post request to create a new token for a jobSeeker
                        request({
                            url: "http://localhost:3000/jobSeekerTokens/add",
                            method: "POST",
                            json: true,
                            body: body
                        },function(error, response, body){
                            console.log(response);
                        });
                    }
                }
            })
            .then(function(){
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveJobSeeker " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "editJobSeeker") {
        response = {};

        //create a json
        var entry = {
            firstName: postData.firstName,
            lastName: postData.lastName,
            address: postData.address,
            email: postData.email,
            phone: postData.phone,
            sin: postData.sin,
            DOB: postData.DOB,
            status: postData.status,
            gender: postData.gender,
            updatedAt: new Date(),
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeekers.update(entry, { where: { id: postData.id } }); //update a record with post request id
            })
            .then(function (jobSeeker) {
                if (jobSeeker) {
                    response.name = postData.firstName;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editJobSeeker " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "deleteJobSeeker") {
        response = {};

        Promise.resolve()
            .then(function () {
                return db.JobSeekers.destroy({ where: { id: postData.id } }); //delete a record with post request id
            })
            .then(function (jobSeeker) {
                if (jobSeeker) {
                    response.name = postData.firstName;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at deleteJobSeeker " + err);
                res.json({ status: status.EXCEPTION });
            })
    }
}
