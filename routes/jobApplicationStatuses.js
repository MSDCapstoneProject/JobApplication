var db = require("../models");
var status = require("./resStatus");

var getResponse = [];

exports.list = function (req, res) {
    var jobApplicationStatusId = req.query.id || req.params.id;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (jobApplicationStatusId) {
                return db.JobApplicationStatuses.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobApplicationStatusId }
                });
            } else {
                return db.JobApplicationStatuses.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (jobApplicationStatuses) {
            if (jobApplicationStatuses) {
                jobApplicationStatuses.forEach(function (jobApplicationStatusData) {
                    getResponse.push(jobApplicationStatusData.dataValues);
                });
            }
            res.json(getResponse);
        })
        .catch(function (err) {
            console.error('Error at get JobApplicationStatuses' + err);
        })
}