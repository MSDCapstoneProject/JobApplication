//Get Method for JobApplication Id
var db = require("../models");
var status = require("./resStatus");

var routes = {};
var getResponse = [];

exports.list = function(req,res){
    getResponse = [];
    var jobSeekerApplicationId = req.query.id || req.params.id; // Check what request you are going to get

    Promise.resolve()
        .then(function () {
            if (jobSeekerApplicationId) {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobSeekerApplicationId }
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
                                console.log("Error at get JobSeekerApplication " + err);
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
            console.log("Error at get JobSeekerApplication " + err);
        });
}
