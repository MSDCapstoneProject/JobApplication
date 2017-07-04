var db = require("../models");
var status = require("./resStatus");

var getResponse = [];

exports.list = function (req, res) {
    var jobSeekerId = req.params.jobSeekerId || req.query.jobSeekerId;
    var jobSeekerSubscriptionId = req.params.jobSeekerSubscriptionId || req.query.jobSeekerSubscriptionId;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (jobSeekerId) {
                return db.JobSeekerSubscriptions.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        { model: db.JobSeekers, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } },
                        { model: db.Topics, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: [{ model: db.TopicGroups, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] }
                    ],
                    where: { JobSeekerId: jobSeekerId }
                })
            } else if (jobSeekerSubscriptionId) {
                return db.JobSeekerSubscriptions.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        { model: db.JobSeekers, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } },
                        { model: db.Topics, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: [{ model: db.TopicGroups, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] }
                    ],
                    where: { id: jobSeekerSubscriptionId }
                })
            } else {
                return db.JobSeekerSubscriptions.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        { model: db.JobSeekers, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } },
                        { model: db.Topics, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: [{ model: db.TopicGroups, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] }
                    ]
                })
            }
        })
        .then(function (jobSeekerSubscriptions) {
            if (jobSeekerSubscriptions) {
                jobSeekerSubscriptions.forEach(function (jobSeekerSubscriptionData) {
                    var jobSeekerSubscription = jobSeekerSubscriptionData.dataValues;
                    getResponse.push(jobSeekerSubscription);
                });
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get jobSeekerSubscription' + err);
        })
}


exports.add = function (req, res) {
    method = "saveJobSeekerSubscription";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobSeekerSubscription";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobSeekerSubscription";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveJobSeekerSubscription") {
        var entry = {
            //need to change at server side
            jobSeekerId: postData.jobSeekerId,
            topicId: postData.topicId,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeekerSubscriptions.create(entry);
            })
            .then(function (JobSeekerSubscriptionData) {
                if (JobSeekerSubscriptionData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveJobSeekerSubscription " + err);
            })
    } else if (method == "editJobSeekerSubscription") {
        var entry = {
            //need to change at server side
            jobSeekerId: postData.jobSeekerId,
            topicId: postData.topicId,
            status: postData.status,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeekerSubscriptions.update(entry, { where: { id: postData.id } });
            })
            .then(function (jobSeekerSubscriptionData) {
                if (jobSeekerSubscriptionData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editJobSeekerSubscription " + err);
            })
    } else if (method == "deleteJobSeekerSubscription") {

        Promise.resolve()
            .then(function () {
                return db.JobSeekerSubscriptions.destroy({ where: { id: postData.id } });
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
                console.log("Error at deleteJobSeekerSubscription " + err);
            })
    } else {
        console.log("Undefined Method");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}
