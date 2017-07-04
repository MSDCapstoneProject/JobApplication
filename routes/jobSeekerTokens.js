var db = require("../models");
var status = require("./resStatus");
var fcmMessage = require("../lib/fcmMessage");

var request = require('request'); // to send request to create a token

var notificationMessage = {};

var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    getResponse = [];
    var jobSeekerTokenId = req.query.id || req.params.id;

    Promise.resolve()
        .then(function () {
            if (jobSeekerTokenId) {
                return db.JobSeekerTokens.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobSeekerTokenId }
                });
            } else {
                return db.JobSeekerTokens.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (jobSeekerTokenData) {
            if (jobSeekerTokenData) {
                notificationMessage.body = {};
                jobSeekerTokenData.forEach(function (jobSeekerTokenData) {
                    getResponse.push(jobSeekerTokenData.dataValues);
                    notificationMessage.title = "Test Message";
                    notificationMessage.body = "From Send Notifications";
                    notificationMessage.data = jobSeekerTokenData.dataValues;
                    fcmMessage.sendMessage(notificationMessage);
                });
            }
            getResponse.status = status.SUCCESS;
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log("Error at get jobSeekerTokens " + err);
        })

}

exports.add = function (req, res) {
    method = "saveJobSeekerTokens";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editJobSeekerTokens";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteJobSeekerTokens";
    post(req, res, method);
}

exports.all = function (req, res) {
    method = "sendAll";
    post(req, res, method);
}

function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveJobSeekerTokens") {
        var entry = {
            token: postData.token,
            jobSeekerId: postData.jobSeekersId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.JobSeekerTokens.create(entry);
            })
            .then(function (jobSeekerTokenData) {
                if (jobSeekerTokenData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at saveJobSeekerTokens' + err);
            })
    } else if (method == "editJobSeekerTokens") { // edit is not required
        var entry = {
            token: postData.token,
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.JobSeekerTokens.update(entry, { where: { id: postData.id } });
            })
            .then(function (jobSeekerTokenData) {
                if (jobSeekerTokenData) {
                    response.status = status.SUCCESS;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at editJobSeekerTokens' + err);
                res.json({ status: status.EXCEPTION });
            })

    } else if (method == "deleteJobSeekerTokens") {
        Promise.resolve()
            .then(function () {
                return db.JobSeekerTokens.destroy({ where: { token: postData.token } }); // delete based on token
            })
            .then(function (jobSeekerTokenData) {
                if (jobSeekerTokenData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at deleteJobSeekerTokens' + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "sendAll") {
        Promise.resolve()
            .then(function () {
                return db.JobSeekerTokens.findAll({ where: { token: postData.token } }); // delete based on token
            })
            .then(function (jobSeekerTokenData) {
                if (jobSeekerTokenData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at deleteJobSeekerTokens' + err);
                res.json({ status: status.EXCEPTION });
            })
    } else {
        console.log("Method not found");
        res.json({ status: status.UNKNOWN_REQUEST });
    }

}