var db = require("../models");
var status = require("./resStatus");
var libFunctions = require("../lib/utilityFunctions");

var getResponse = [];

exports.list = function (req, res) {
    var topicId = req.params.id || req.query.id;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (topicId) {
                return db.Topics.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: topicId }
                })
            } else {
                return db.Topics.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                })
            }
        })
        .then(function (topics) {
            if (topics)
                var topicGroupPromises = [];
            topics.forEach(function (topicData) {
                var topic = topicData.dataValues;
                getResponse.push(topic);
                topic.topicGroup = {};
                topicGroupPromises.push(
                    Promise.resolve()
                        .then(function () {
                            return db.TopicGroups.findAll({
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                where: { id: topic.topicGroupId }
                            });
                        })
                        .then(function (topicGroupData) {
                            if (topicGroupData) {
                                topic.topicGroup = topicGroupData[0].dataValues;
                            }
                        })
                        .catch(function (err) {
                            console.log('Error at topicGroupPromises ' + err);
                        })
                );

            });
            return Promise.all(topicGroupPromises);
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get topics ' + err);
        })
}


exports.add = function (req, res) {
    method = "saveTopic";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editTopic";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteTopic";
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

