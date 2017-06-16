var db = require("../models");
var status = require("./resStatus");

var getResponse = [];
var method;
var response = {};


exports.list = function (req, res) {
    getResponse = [];
    var userTokenId = req.query.id || req.params.id;

    Promise.resolve()
        .then(function () {
            if (userTokenId) {
                return db.UserTokens.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: userTokenId }
                });
            } else {
                return db.UserTokens.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (userTokenData) {
            if (userTokenData) {
                userTokenData.forEach(function (userTokenData) {
                    getResponse.push(userTokenData.dataValues);
                });

            }
            getResponse.status = status.SUCCESS;
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log("Error at get userTokens " + err);
        })

}

exports.add = function (req, res) {
    method = "saveUserTokens";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editUserTokens";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteUserTokens";
    post(req, res, method);
}

function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    response = {};

    if (method == "saveUserTokens") {
        var entry = {
            token: postData.token,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.UserTokens.create(entry);
            })
            .then(function (userTokenData) {
                if (userTokenData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at saveUserTokens' + err);
                res.json({ status: status.EXCEPTION });
            })


    } else if (method == "editUserTokens") {
        var entry = {
            token: postData.token,
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.UserTokens.update(entry, { where: { id: postData.id } });
            })
            .then(function (userTokenData) {
                if (userTokenData) {
                    response.status = status.SUCCESS;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at editUserTokens' + err);
                res.json({ status: status.EXCEPTION });
            })

    } else if (method == "deleteUserTokens") {
        Promise.resolve()
            .then(function () {
                return db.UserTokens.destroy({ where: { id: postData.id } });
            })
            .then(function (userTokenData) {
                if (userTokenData) {
                    response.status = status.SUCCESS;
                }
                res.json(response);
            })
            .catch(function (err) {
                console.log('Error at deleteUserTokens' + err);
                res.json({ status: status.EXCEPTION });
            })
    } else {
        console.log("Method not found");
        res.json({ status: status.UNKNOWN_REQUEST });
    }

}