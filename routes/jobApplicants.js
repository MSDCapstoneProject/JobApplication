var db = require("../models");
var status = require("./resStatus");
var notifiticationFunctions = require("./sendJobNotification");

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    var jobId = req.query.jobId || req.params.jobId;
    var jobApplicationId = req.query.jobApplicationId || req.params.jobApplicationId;
    getResponse = [];

    Promise.resolve()
        .then(function () {

            if (jobId && jobApplicationId == null) {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { jobId: jobId }
                });
            } else if(jobApplicationId && jobId == null) {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobApplicationId }
                });
            }else if(jobSeekerId && jobApplicationId){
                return null;
            }
        })
        .then(function (JobApplications) {
            if (JobApplications) {
                var employerPromises = [];
                JobApplications.forEach(function (JobApplicationsData) {
                    var jobApplication = JobApplicationsData.dataValues;
                    getResponse.push(jobApplication);
                    jobApplication.employer = {};
                    jobApplication.job = {};
                    jobApplication.jobSeeker = {};
                    employerPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.Employers.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobApplication.employerId }
                                });
                            })
                            .then(function (employerData) {
                                if (employerData) {
                                    jobApplication.employer = employerData[0].dataValues;
                                }
                                return db.Jobs.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobApplication.jobId }
                                });
                            })
                            .then(function (jobdata) {
                                if (jobdata) {
                                    jobApplication.job = jobdata[0].dataValues;
                                }
                                return db.JobSeekers.findAll({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobApplication.jobSeekerId }
                                });
                            })
                            .then(function (jobSeekerdata) {
                                if (jobSeekerdata) {
                                    jobApplication.jobSeeker = jobSeekerdata[0].dataValues;
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
            console.log("Error at get jobApplicant " + err);
        });
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
            jobApplicationStatusId: postData.jobApplicationStatusId,
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.JobApplications.update(entry, { where: { id: postData.id } });
            })
            .then(function (jobApplication) {
                if (jobApplication) {
                    //send notifiction on status changed for a particular job application 
                    notifiticationFunctions.notifyJobStatusUpdate(postData.id);
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at editJobApplication ' + err);
            })

    }
}