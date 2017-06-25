var db = require("../models");
var status = require("./resStatus");
var notifiticationFunctions = require("./sendJobNotification");

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    var employerId = req.query.id || req.params.id;
    getResponse = [];

    Promise.resolve()
        .then(function () {
            if (employerId) {
                return db.Jobs.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { EmployerId: employerId }
                })
            }
        })
        .then(function (jobs) {
            if (jobs) {
                var jobApplicationsPromises = [];
                jobs.forEach(function (jobData) {
                    var job = jobData.dataValues;
                    job.JobApplications = [];
                    getResponse.push(job);
                    jobApplicationsPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.JobApplications.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { JobId: job.id }
                                });
                            })
                            .then(function (jobApplications) {
                                var jobSeekersPromises = [];
                                jobApplications.forEach(function (jobApplicationData) {
                                    var jobApplication = jobApplicationData.dataValues;
                                    job.JobApplications.push(jobApplication);
                                    jobSeekersPromises.push(
                                        Promise.resolve()
                                            .then(function () {
                                                return db.JobSeekers.findAll({
                                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                                    where: { id: jobApplication.JobSeekerId }
                                                })
                                            })
                                            .then(function (jobSeekers) {
                                                if (jobSeekers) {
                                                    jobApplication.JobSeekers = [];
                                                    jobSeekers.forEach(function (jobSeekerData) {
                                                        jobApplication.JobSeekers.push(jobSeekerData);
                                                    });
                                                }
                                            })
                                            .catch(function (err) {
                                                console.log('Error at jobSeekersPromises ' + err);
                                            })
                                    );
                                });
                                return Promise.all(jobSeekersPromises);
                            })
                            .catch(function (err) {
                                console.log('Error at jobApplicationsPromises ' + err);
                            })
                    );
                });
                return Promise.all(jobApplicationsPromises);
            }
        })
        .then(function () {
            getResponse.status = status.SUCCESS;
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at getJobApplicants ' + err);
        })
}

exports.update = function (req, res) {
    method = "editJobApplication";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "editJobApplication") {
        var entry = {
            applicationStatus: postData.status,
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.JobApplications.update(entry, { where: { id: postData.jobApplicationId } });
            })
            .then(function (jobApplication) {
                if (jobApplication) {
                    //send notifiction on status changed for a particular job application 
                    notifiticationFunctions.notifyJobStatusUpdate(postData.jobApplicationId);
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at editJobApplication ' + err);
            })

    }
}