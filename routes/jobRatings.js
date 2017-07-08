var db = require("../models");
var status = require("./resStatus");
var libFunctions = require("../lib/utilityFunctions");

var getResponse = [];

exports.list = function (req, res) {
    var jobRatingId = req.params.id || req.query.id;
    var jobSeekerId = req.params.jobSeekerId || req.query.jobSeekerId;

    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (jobRatingId) {
                return db.JobRatings.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobRatingId }
                })
            } else if (jobSeekerId) {
                return db.JobRatings.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { jobSeekerId: jobSeekerId }
                })
            } else {
                return db.JobRatings.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                })
            }
        })
        .then(function (jobRatings) {
            if (jobRatings)
                var jobRatingPromises = [];
            jobRatings.forEach(function (jobRatingData) {
                var jobRating = jobRatingData.dataValues;
                getResponse.push(jobRating);
                jobRating.jobSeeker = {};
                jobRating.job = {};
                jobRatingPromises.push(
                    Promise.resolve()
                        .then(function () {
                            return db.JobSeekers.findAll({
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                where: { id: jobRating.jobSeekerId }
                            });
                        })
                        .then(function (jobSeekerData) {
                            if (jobSeekerData) {
                                jobRating.jobSeeker = jobSeekerData[0].dataValues;
                            }
                        })
                        .then(function () {
                            return db.Jobs.findAll({
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                where: { id: jobRating.jobId }
                            })
                        })
                        .then(function (jobData) {
                            if (jobData) {
                                jobRating.job = jobData[0].dataValues;
                            }
                        })
                        .catch(function (err) {
                            console.log('Error at topicGroupPromises ' + err);
                        })
                );

            });
            return Promise.all(jobRatingPromises);
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get jobRatings ' + err);
        })
}


exports.add = function (req, res) {
    method = "saveJobRating";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobRating";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobRating";
    post(req, res, method);
}

function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveTopic") {
        var entry = {
            //need to change at server side   
            description: postData.description,
            internalCode: libFunctions.formatInternalCode(postData.description),
            topicGroupId: postData.topicGroupId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.Topics.create(entry);
            })
            .then(function (topicData) {
                if (topicData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveTopic " + err);
            })
    } else if (method == "editTopic") {
        var entry = {
            description: postData.description,
            internalCode: libFunctions.formatInternalCode(postData.description),
            topicGroupId: postData.topicGroupId,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.Topics.update(entry, { where: { id: postData.id } });
            })
            .then(function (topicData) {
                if (topicData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editTopic " + err);
            })
    } else if (method == "deleteTopic") {

        Promise.resolve()
            .then(function () {
                return db.Topics.destroy({ where: { id: postData.id } });
            })
            .then(function (topicsData) {
                if (topicsData) {
                    response.status = status.SUCCESS;
                } else {
                    response.status = status.NO_DATA_FOUND;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at deleteTopics " + err);
            })
    } else {
        console.log("Undefined Method");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}

