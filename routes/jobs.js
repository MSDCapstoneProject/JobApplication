var db = require("../models");
var status = require("./resStatus");
var notifiticationFunctions = require("./sendJobNotification");
//var fcmMessage = require("./lib/fcmMesage");

var notificationMessage = {};

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    getResponse = [];
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
                    getResponse.push(job); // added value into getResponse
                    job.employer = {};
                    employerPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.Employers.findOne({
                                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                    where: { id: job.employerId }
                                })
                            })
                            .then(function (employerData) {
                                if (employerData) {
                                    var employer = {};
                                    employer = employerData.dataValues;
                                    job.employer = employer;
                                }
                                return db.JobTypes.findOne({ where: { id: job.jobTypeId } });
                            })
                            .then(function (jobTypeData) {
                                if (jobTypeData) {
                                    job.jobType = jobTypeData.description;
                                }
                                return db.JobCategories.findOne({ where: { id: job.jobCategoryId } })
                            })
                            .then(function (jobCategoryData) {
                                if (jobCategoryData) {
                                    job.jobCategory = jobCategoryData.description;
                                }
                                return db.JobApplications.findAll({
                                    attributes: [[db.Sequelize.fn('COUNT', 'id'), 'totalApplications']], //db.Sequelize.literal('views+1')
                                    where: { JobId: job.id, JobApplicationStatusId: 2 } //convert to enum
                                });
                            })
                            .then(function (jobApplicationsData) {
                                if (jobApplicationsData) {
                                    job.totalApplications = jobApplicationsData[0].dataValues.totalApplications || 0;
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
        .then(function () {
            getResponse.status = status.SUCCESS;
            res.json(getResponse);
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

exports.view = function (req, res) {
    method = "viewJobs";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    var response = {};

    if (method == "saveJobs") {
        response = {};

        var entry = {
            title: postData.title,
            street: postData.street,
            city: postData.city,
            province: postData.province,
            country: postData.country,
            postalCode: postData.postalCode,
            startDate: postData.startDate,
            endDate: postData.endDate,
            startTime: postData.startTime,
            endTime: postData.endTime,
            wage: postData.wage,
            description: postData.description,
            postDate: postData.postDate,
            expiryDate: postData.expiryDate,
            status: postData.status,
            employerId: postData.employerId,
            jobTypeId: postData.jobTypeId,
            jobCategoryId: postData.jobCategoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
            totalPositions: postData.totalPositions,
            views: 0
        }

        Promise.resolve()
            .then(function () {
                return db.Jobs.create(entry);
            })
            .then(function (jobs) {
                if (jobs) {
                    response.jobTitle = postData.title;
                    notifiticationFunctions.notifyJobPosting(jobs.id);
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveJobs " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "editJobs") {
        response = {};

        var entry = {
            title: postData.title,
            street: postData.street,
            city: postData.city,
            province: postData.province,
            country: postData.country,
            postalCode: postData.postalCode,
            startDate: postData.startDate,
            endDate: postData.endDate,
            startTime: postData.startTime,
            endTime: postData.endTime,
            wage: postData.wage,
            description: postData.description,
            postDate: postData.postDate,
            expiryDate: postData.expiryDate,
            status: postData.status,
            employerId: postData.employerId,
            jobTypeId: postData.jobTypeId,
            jobCategoryId: postData.jobCategoryId,
            updatedAt: new Date(),
            totalPositions: postData.totalPositions
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
    } else if (method == "viewJobs") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.Jobs.update({
                    views: db.Sequelize.literal('views+1') //sequelize.literal('profiles.userId IS null'),
                }, {
                        where: { id: postData.jobId }
                    });
            })
            .then(function (jobData) {
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at viewJobs " + err);
            })

    } else {
        console.log("Method not found");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}