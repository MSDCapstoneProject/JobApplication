var db = require("../models");
var status = require("./resStatus");

var getResponse = [];

exports.list = function (req, res) {
    var jobCategoryId = req.query.id || req.params.id;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (jobCategoryId) {
                return db.JobCategories.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobCategoryId }
                });
            } else {
                return db.JobCategories.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (jobCategories) {
            if (jobCategories) {
                jobCategories.forEach(function (jobCategoryData) {
                    getResponse.push(jobCategoryData.dataValues);
                });
            }
            res.json(getResponse);
        })
        .catch(function (err) {
            console.error('Error at get JobCategories' + err);
        })
}