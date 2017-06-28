var db = require("../models");
var status = require("./resStatus");
var libFunctions = require("../lib/utilityFunctions");

var getResponse = [];

exports.list = function (req, res) {
    var topicGroupId = req.params.id || req.query.id;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (topicGroupId) {
                return db.TopicGroups.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: topicGroupId }
                })
            } else {
                return db.TopicGroups.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                })
            }
        })
        .then(function (topicGroups) {
            if (topicGroups)
                var topicPromises = [];
            topicGroups.forEach(function (topicGroupData) {
                var topicGroup = topicGroupData.dataValues;
                getResponse.push(topicGroup);
                topicGroup.topics = [];
                topicPromises.push(
                    Promise.resolve()
                        .then(function () {
                            return db.Topics.findAll({
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                where: { TopicGroupId: topicGroup.id }
                            });
                        })
                        .then(function (topics) {
                            if (topics) {
                                topics.forEach(function (topicData) {
                                    var topic = topicData.dataValues;
                                    topicGroup.topics.push(topic);
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log('Error at topicPromises ' + err);
                        })
                );

            });
            return Promise.all(topicPromises);
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get topicGroups ' + err);
        })
}


exports.add = function (req, res) {
    method = "saveTopicGroup";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editTopicGroup";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteTopicGroup";
    post(req, res, method);
}

function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveTopicGroup") {
        var entry = {
            //need to change at server side   
            description: postData.description,
            internalCode: libFunctions.formatInternalCode(postData.description),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.TopicGroups.create(entry);
            })
            .then(function (topicGroupData) {
                if (topicGroupData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveTopicGroup " + err);
            })
    } else if (method == "editTopicGroup") {
        var entry = {
            description: postData.description,
            internalCode: libFunctions.formatInternalCode(postData.description),
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.TopicGroups.update(entry, { where: { id: postData.id } });
            })
            .then(function (topicGroupData) {
                if (topicGroupData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editTopicGroup " + err);
            })
    } else if (method == "deleteTopicGroup") {

        Promise.resolve()
            .then(function () {
                return db.TopicGroups.destroy({ where: { id: postData.id } });
            })
            .then(function (topicGroupsData) {
                if (topicGroupsData) {
                    response.status = status.SUCCESS;
                }else{
                    response.status = status.NO_DATA_FOUND;
                }
            })
            .then(function () {
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at deleteTopicGroup " + err);
            })
    } else {
        console.log("Undefined Method");
        res.json({ status: status.UNKNOWN_REQUEST });
    }
}

