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
                return db.JobSubscribers.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { JobSeekerId: jobSeekerId }
                });
            } else {
                return db.JobSubscribers.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (jobSubscribers) {
            if (jobSubscribers) {
                var employerPromises = [];
                jobSubscribers.forEach(function (jobSubscribersData) {
                    var jobSubscriber = jobSubscribersData.dataValues;
                    getResponse.push(jobSubscriber);
                    jobSubscriber.Employer = {};
                    jobSubscriber.Job = {};
                    jobSubscriber.JobSeeker = {};
                    employerPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.Employers.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobSubscriber.EmployerId }
                                });
                            })
                            .then(function (employerData) {
                                if (employerData) {
                                    jobSubscriber.Employer = employerData[0].dataValues;
                                }
                                return db.Jobs.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobSubscriber.JobId }
                                });
                            })
                            .then(function (jobdata) {
                                if (jobdata) {
                                    jobSubscriber.Job = jobdata[0].dataValues;
                                }
                                return db.JobSeekers.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobSubscriber.JobSeekerId }
                                });
                            })
                            .then(function (jobSeekerdata) {
                                if (jobSeekerdata) {
                                    jobSubscriber.JobSeeker = jobSeekerdata[0].dataValues;
                                }
                            })
                            .catch(function (err) {
                                console.log("Error at get jobSubscribers " + err);
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

        });
}

exports.add = function (req, res) {
    method = "saveJobSubscriber";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobSubscriber";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobSubscriber";
    post(req, res, method);
}

function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveJobSubscriber") {
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
                return db.JobSubscribers.create(entry);
            })
            .then(function (jobSubscribersData) {
                if (jobSubscribersData) {
                    response.applicationStatus = entry.applicationStatus;
                    response.appliedOn = postData.appliedOn;
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveJobSubscriber " + err);
            })
    } else if (method == "editJobSubscriber") {
        var entry = {
            applicationStatus: postData.applicationStatus,
            EmployerId: postData.EmployerId,
            JobId: postData.JobId,
            JobSeekerId: postData.JobSeekerId,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobSubscribers.update(entry, { where: { id: postData.id } });
            })
            .then(function (jobSubscribersData) {
                if (jobSubscribersData) {
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editJobSubscriber " + err);
            })
    } else if (method == "deleteJobSubscriber") {
        Promise.resolve()
            .then(function () {
                return db.JobSubscribers.destroy({ where: { id: postData.id } });
            })
            .then(function (jobSubscribersData) {
                if (jobSubscribersData) {
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editJobSubscriber " + err);
            })
    } else {
        console.log("Undefined Method");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}