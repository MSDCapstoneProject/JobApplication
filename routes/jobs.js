var db = require("../models");
var status = require("./resStatus");

var routes = {};
var response = [];
var method;
//var response = [];

exports.list = function (req, res) {

    var jobId = req.query.id || req.params.id;

    Promise.resolve()
        .then(function () {
            if (jobId) {
                return db.Jobs.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobId }
                });
            } else {
                return db.Jobs.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                });
            }
        })
        .then(function (jobs) {
            if (jobs) {
                var employerPromises = [];
                jobs.forEach(function (jobData) {
                    var job = jobData.dataValues;
                    response.push(job); // added value into response
                    job.Employer = [];
                    employerPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.Employers.findOne({ where: { id: job.EmployerId } })
                            })
                            .then(function (employerData) {
                                if (employerData) {
                                    var employer = {};
                                    employer = employerData.dataValues;
                                    job.Employer.push(employer);
                                }
                                return db.JobTypes.findOne({where:{ id: job.JobTypeId}});
                            })
                            .then(function(jobTypeData){
                                if(jobTypeData){
                                    job.JobType = jobTypeData.description;
                                }
                                return db.JobCategories.findOne({where :{ id : job.JobCategoryId}})
                            })
                            .then(function(jobCategoryData){
                                if(jobCategoryData){
                                    job.JobCategory = jobCategoryData.description; 
                                }
                            })
                            .catch(function (err) {
                                console.log("Error at Get Jobs - Employers " + err);
                            })
                    );
                });
                return Promise.all(employerPromises);
            }
        })
        .then(function(){
            res.json(response);
        })
        .catch(function (err) {
            console.log("Error at Get Jobs" + err);
            res.json({ status: status.EXCEPTION });
        })
}

exports.add = function (req, res) {
    method = "saveJobs";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobs";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobs";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    var response = {};

    if (method == "saveJobs") {
        response = {};

        var entry = {
            title: postData.title,
            jobLocation: postData.jobLocation,
            startDate: postData.startDate,
            endDate: postData.endDate,
            startTime: postData.startTime,
            endTime: postData.endTime,
            wage: postData.wage,
            description: postData.description,
            postDate: postData.postDate,
            expiryDate: postData.expiryDate,
            status: postData.status,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.Jobs.create(entry);
            })
            .then(function (jobs) {
                if (jobs) {
                    response.jobTitle = postData.title;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at add Jobs " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "editJobs") {
        response = {};

        var entry = {
            title: postData.title,
            jobLocation: postData.jobLocation,
            startDate: postData.startDate,
            endDate: postData.endDate,
            startTime: postData.startTime,
            endTime: postData.endTime,
            wage: postData.wage,
            description: postData.description,
            postDate: postData.postDate,
            expiryDate: postData.expiryDate,
            status: postData.status,
            updatedAt: new Date()
        }
        Promise.resolve()
            .then(function () {
                return db.Jobs.update(entry, { where: { id: postData.id } })
            })
            .then(function (jobs) {
                if (jobs) {
                    response.jobTitle = postData.title;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at update Jobs " + err);
                res.json({ status: status.EXCEPTION });
            })

    } else if (method == "deleteJobs") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.Jobs.destroy({ where: { id: postData.id } });
            })
            .then(function (jobs) {
                if (jobs) {
                    response.jobTitle = postData.title;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at delete Jobs " + err);
                res.json({ status: status.EXCEPTION });
            })
    }
}