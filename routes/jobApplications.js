var db = require("../models");
var status = require("./resStatus");

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    getResponse = [];
    var jobSeekerId = req.query.id || req.params.id; // Check what request you are going to get

    Promise.resolve()
        .then(function () {
            if (jobSeekerId) {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { JobSeekerId: jobSeekerId }
                });
            } else {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (JobApplications) {
            if (JobApplications) {
                var employerPromises = [];
                JobApplications.forEach(function (JobApplicationsData) {
                    var jobApplication = JobApplicationsData.dataValues;
                    getResponse.push(jobApplication);
                    jobApplication.Employer = {};
                    jobApplication.Job = {};
                    jobApplication.JobSeeker = {};
                    employerPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.Employers.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobApplication.EmployerId }
                                });
                            })
                            .then(function (employerData) {
                                if (employerData) {
                                    jobApplication.Employer = employerData[0].dataValues;
                                }
                                return db.Jobs.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobApplication.JobId }
                                });
                            })
                            .then(function (jobdata) {
                                if (jobdata) {
                                    jobApplication.Job = jobdata[0].dataValues;
                                }
                                return db.JobSeekers.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobApplication.JobSeekerId }
                                });
                            })
                            .then(function (jobSeekerdata) {
                                if (jobSeekerdata) {
                                    jobApplication.JobSeeker = jobSeekerdata[0].dataValues;
                                }
                            })
                            .catch(function (err) {
                                console.log("Error at get JobApplications " + err);
                            })
                    );
                });
                return Promise.all(employerPromises);
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log("Error at savejobApplication " + err);
        });
}

exports.add = function (req, res) {
    method = "savejobApplication";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editjobApplication";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deletejobApplication";
    post(req, res, method);
}

function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "savejobApplication") {
        var entry = {
            applicationStatus: "applied", //need to change at server side
            appliedOn: new Date(),
            EmployerId: postData.EmployerId,
            JobId: postData.JobId,
            JobSeekerId: postData.JobSeekerId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobApplications.create(entry);
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.applicationStatus = entry.applicationStatus;
                    response.appliedOn = postData.appliedOn;
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at savejobApplication " + err);
            })
    } else if (method == "editjobApplication") {
        var entry = {
            applicationStatus: postData.applicationStatus,
            EmployerId: postData.EmployerId,
            JobId: postData.JobId,
            JobSeekerId: postData.JobSeekerId,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobApplications.update(entry, { where: { id: postData.id } });
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editjobApplication " + err);
            })
    } else if (method == "deletejobApplication") {

        Promise.resolve()
            .then(function () {
                return db.JobApplications.destroy({ where: { id: postData.id } });
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editjobApplication " + err);
            })
    } else {
        console.log("Undefined Method");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}