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
                    where: { jobSeekerId: jobSeekerId }
                });
            } else if (jobApplicationId && jobSeekerId == null) {
                return db.JobApplications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobApplicationId }
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
                                return db.JobApplicationStatuses.findAll({
                                    where: { id: jobApplication.jobApplicationStatusId }
                                })
                            })
                            .then(function (jobApplicationStatus) {
                                if (jobApplicationStatus) {
                                    jobApplication.applicationStatus = jobApplicationStatus[0].description;
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
            console.log("Error at get jobApplication " + err);
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
            jobApplicationStatusId: 1, //need to change at server side (Get it through Enums)
            appliedOn: new Date(),
            employerId: postData.employerId,
            jobId: postData.jobId,
            jobSeekerId: postData.jobSeekerId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                //find if jobSeeker already applied for this job
                return db.JobApplications.findAll({ where: { jobId: postData.jobId, jobSeekerId: postData.jobSeekerId, } })
            })
            .then(function (jobApplicationData) {
                if (jobApplicationData.length>0) {
                    response.status = status.DATA_FULL;
                    return null;
                } else {
                    //need to check the number of positions 
                    //if (response.jobApplicationValid) {
                    //there are still some jobs to be filled so we increased the count and now update the job
                    return db.JobApplications.create(entry);
                }
                //} else {
                //response.message = "All Positions Are Filled";
                //response.status = status.DATA_FULL;
                //}
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.jobApplicationStatusId = entry.jobApplicationStatusId;
                    response.appliedOn = postData.appliedOn;
                }
            })
            .then(function () {
                //if (response.jobApplicationValid) {
                if (!response.status && response.status == null) {
                    return updateJobsAppliedCount(postData.jobId, response, '+1');
                }
                //} else {
                //response.increaseJobsApplied = false;
                //}
            })
            .then(function () {
                //change the staus if both the functions are successful
                //if (response.jobApplicationValid && response.increaseJobsApplied) {
                if (!response.status && response.status == null) {
                    response.status = status.SUCCESS;
                }
                //}
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at savejobApplication " + err);
            })
    } else if (method == "editjobApplication") {

        var entry = {
            employerId: postData.employerId,
            jobId: postData.jobId,
            jobSeekerId: postData.jobSeekerId,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                if (postData.applicationStatus) {
                    return db.JobApplicationStatuses.findAll({ where: { description: postData.applicationStatus } })
                }
            })
            .then(function (jobApplicationStatus) {
                if (jobApplicationStatus) {
                    entry.jobApplicationStatusId = jobApplicationStatus[0].id;
                }
                return db.JobApplications.update(entry, { where: { id: postData.jobApplicationId } });
            })
            .then(function (JobApplicationsData) {
                if (JobApplicationsData) {
                    response.status = status.SUCCESS;
                }
            })
            .then(function () {
                if (postData.jobApplicationStatusId == "1") {  // Increase the count on applied
                    return updateJobsAppliedCount(postData.jobId, response, "+1");
                } else if (postData.jobApplicationStatusId == "4") {  //Decrease the count on cancellation
                    return updateJobsAppliedCount(postData.jobId, response, "-1");
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

function updateJobsAppliedCount(jobId, response, value) {
    return Promise.resolve()
        .then(function () {
            return db.Jobs.update({
                filledPositions: db.Sequelize.literal('filledPositions' + value)
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