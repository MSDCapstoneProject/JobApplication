var db = require("../models");
var status = require("./resStatus");

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    getResponse = [];
    var jobSeekerId = req.query.jobSeekerId || req.params.jobSeekerId; // Check what request you are going to get
    var jobApplicationId = req.query.jobApplicationId || req.params.jobApplicationId;

    Promise.resolve()
        .then(function () {

            if (jobSeekerId && jobApplicationId == null) {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { JobSeekerId: jobSeekerId }
                });
            } else if(jobApplicationId && jobSeekerId == null) {
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
            //.then(function () {
                //allow unlimitted number of applications
                //return isJobApplicationValid(postData.JobId, response);
            //})
            .then(function () {
                //need to check the number of positions 
                //if (response.jobApplicationValid) {
                    //there are still some jobs to be filled so we increased the count and now update the job
                    return db.JobApplications.create(entry);
                //} else {
                    //response.message = "All Positions Are Filled";
                    //response.status = status.DATA_FULL;
                //}
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.applicationStatus = entry.applicationStatus;
                    response.appliedOn = postData.appliedOn;
                }
            })
            .then(function () {
                //if (response.jobApplicationValid) {
                    return updateJobsAppliedCount(postData.JobId, response, '+1');
                //} else {
                    //response.increaseJobsApplied = false;
                //}
            })
            .then(function () {
                //change the staus if both the functions are successful
                //if (response.jobApplicationValid && response.increaseJobsApplied) {
                    response.status = status.SUCCESS;
                //}
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
                return db.JobApplications.update(entry, { where: { id: postData.jobApplicationId } });
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.status = status.SUCCESS;
                }
            })
            .then(function(){
                if(postData.applicationStatus == "canceled")
                return updateJobsAppliedCount(postData.JobId, response, "-1"); //Decrease the count on cancellation
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
                return db.JobApplications.destroy({ where: { id: postData.jobApplicationId } });
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


function isJobApplicationValid(jobId, response) {
    return Promise.resolve()
        .then(function () {
            return db.Jobs.findAll({
                where: { id: jobId }
            });
        })
        .then(function (jobData) {
            if (jobData) {
                var job = jobData[0].dataValues;
                //update the count only if
                if (job.totalPositions != job.filledPositions && job.totalPositions > job.filledPositions) {
                    response.jobApplicationValid = true;
                } else {
                    response.jobApplicationValid = false;
                }
            } else {
                response.jobApplicationValid = false;
            }
        })
        .catch(function (err) {
            console.log('Error at isJobApplicationValid ' + err);
        })

}

function updateJobsAppliedCount(jobId, response,value) {
    return Promise.resolve()
        .then(function () {
            return db.Jobs.update({
                filledPositions: db.Sequelize.literal('filledPositions'+value)
            }, {
                    where: { id: jobId }
                })
        })
        .then(function (jobsData) {
            if (jobsData) {
                response.increaseJobsApplied = true;
            } else {
                response.increaseJobsApplied = false;
            }
        })
        .catch(function (err) {
            console.log('Error at Update increaseJobsApplied ' + err);
        })
}