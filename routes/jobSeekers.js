/*
 * GET JobSeeker.
 */

var db = require("../models");
var status = require("./resStatus");

var routes = {};
var response = {};

function get(req, res) {
    var jobSeekersId = req.query.id || null;

    Promise.resolve()
        .then(function () {
            if (jobSeekersId) {
                return db.JobSeeker.findAll({ where: { id: jobSeekersId } }); //if id is present
            } else {
                return db.JobSeeker.findAll(); //if id is not present
            }
        })
        .then(function (jobSeekers) {
            if (jobSeekers) {
                res.render("jobSeekers", { page_title: "Job Bridge - Job Seekers", data: jobSeekers });
            }
        })
        .catch(function (err) {
            console.log("Error at jobSeekers get request" + err);
        })
}

/*
 * Post JobSeekers.
 */

function post(req, res) {
    var postData = req.query;
    
    if (postData.method == "searchJobSeekers") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.JobSeeker.findAll({
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
    else if (postData.method == "saveJobSeeker") {
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
            gender: postData.gender
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeeker.create(entry);   //create a record
            })
            .then(function (jobSeeker) {
                if (jobSeeker) {
                    response.name = jobSeeker.firstName;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveJobSeeker " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (postData.method == "editJobSeeker") {
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
            gender: postData.gender
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeeker.update(entry, {where: { id: postData.id } }); //update a record with post request id
            })
            .then(function (jobSeeker) {
                if (jobSeeker) {
                    response.name = postData.name;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editJobSeeker " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (postData.method == "deleteJobSeeker") {
        response = {};

        Promise.resolve()
            .then(function () {
                return db.JobSeeker.destroy({ where: { id: postData.id } }); //delete a record with post request id
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


routes.get = get;
routes.post = post;
module.exports = routes;
