var db = require("../models");
var status = require("./resStatus");

var getResponse = [];

exports.list = function (req, res) {
    var jobSeekerId = req.params.jobSeekerId || req.query.jobSeekerId;
    var jobSeekerNotificationId = req.params.jobSeekerNotificationId || req.query.jobSeekerNotificationId;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (jobSeekerId) {
                return db.JobSeekerNotifications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        { model: db.JobSeekers, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } },
                        { model: db.Topics, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: [{ model: db.TopicGroups, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] }
                    ],
                    where: { JobSeekerId: jobSeekerId }
                })
            } else if (jobSeekerNotificationId) {
                return db.JobSeekerNotifications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        { model: db.JobSeekers, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } },
                        { model: db.Topics, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: [{ model: db.TopicGroups, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] }
                    ],
                    where: { id: jobSeekerNotificationId }
                })
            } else {
                return db.JobSeekerNotifications.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        { model: db.JobSeekers, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } },
                        { model: db.Topics, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }, include: [{ model: db.TopicGroups, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] }
                    ]
                })
            }
        })
        .then(function (jobSeekerNotifications) {
            if (jobSeekerNotifications) {
                jobSeekerNotifications.forEach(function (jobSeekerNotificationData) {
                    var jobSeekerNotification = jobSeekerNotificationData.dataValues;
                    getResponse.push(jobSeekerNotification);
                });
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get jobSeekerNotification' + err);
        })
}


exports.add = function (req, res) {
    method = "saveJobSeekerNotification";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobSeekerNotification";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobSeekerNotification";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveJobSeekerNotification") {
        var entry = {
            //need to change at server side
            JobSeekerId: postData.JobSeekerId,
            TopicId: postData.TopicId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeekerNotifications.create(entry);
            })
            .then(function (JobSeekerNotificationData) {
                if (JobSeekerNotificationData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveJobSeekerNotification " + err);
            })
    } else if (method == "editJobSeekerNotification") {
        var entry = {
            //need to change at server side
            JobSeekerId: postData.JobSeekerId,
            TopicId: postData.TopicId,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.JobSeekerNotifications.update(entry, { where: { id: postData.id } });
            })
            .then(function (jobSeekerNotificationData) {
                if (jobSeekerNotificationData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editJobSeekerNotification " + err);
            })
    } else if (method == "deleteJobSeekerNotification") {

        Promise.resolve()
            .then(function () {
                return db.JobSeekerNotifications.destroy({ where: { id: postData.id } });
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
                console.log("Error at deleteJobSeekerNotification " + err);
            })
    } else {
        console.log("Undefined Method");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}
