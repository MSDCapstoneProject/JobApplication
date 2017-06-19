var db = require("../models");
var status = require("./resStatus");

var getResponse = [];

exports.list = function (req, res) {
    var jobTypeId = req.query.id || req.params.id;
    getResponse = [];

    Promise.resolve()
        .then(function () {
            if (jobTypeId) {
                return db.JobTypes.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobTypeId }
                })
            } else {
                return db.JobTypes.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                })
            }
        })
        .then(function (jobTypes) {
            if (jobTypes) {
                jobTypes.forEach(function(jobTypeData) {
                    getResponse.push(jobTypeData.dataValues);
                }, this);
            }
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get JobTypes ' + err);
        })
}