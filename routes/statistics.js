var db = require("../models");
var status = require("./resStatus");

var notificationMessage = {};

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.jobsByCity = function (req, res) {
    getResponse = [];
    var employerId = req.param.employerId || req.query.employerId;
    var year = req.param.year || req.query.year;
    var month = req.param.month || req.query.month;

    Promise.resolve()
        .then(function () {
            //make a call to a procedure to CALL proc_stats_jobs_by_city(2, '2017', '07');
            return db.sequelize.query("CALL proc_stats_jobs_by_city('" + employerId + "','" + year + "','" + month + "')");
        })
        .then(function (jobsByCities) {
            if (jobsByCities) {
                jobsByCities.forEach(function (jobsByCity) {
                    getResponse.push(jobsByCity);
                });
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at jobsByCity ' + err);
        })
}


exports.jobsByJobType = function (req, res) {
    getResponse = [];
    var employerId = req.param.employerId || req.query.employerId;
    var year = req.param.year || req.query.year;
    var month = req.param.month || req.query.month;

    Promise.resolve()
        .then(function () {
            //make a call to a procedure to CALL proc_stats_jobs_by_jobType(2, '2017', '07');
            return db.sequelize.query("CALL proc_stats_jobs_by_jobType('" + employerId + "','" + year + "','" + month + "')");
        })
        .then(function (jobsByJobTypes) {
            if (jobsByJobTypes) {
                jobsByJobTypes.forEach(function (jobsByJobType) {
                    getResponse.push(jobsByJobType);
                });
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at jobsByJobType ' + err);
        })
}


exports.jobsByJobCategory = function (req, res) {
    getResponse = [];
    var employerId = req.param.employerId || req.query.employerId;
    var year = req.param.year || req.query.year;
    var month = req.param.month || req.query.month;

    Promise.resolve()
        .then(function () {
            //make a call to a procedure to CALL proc_stats_jobs_by_jobCategory(2, '2017', '07');
            return db.sequelize.query("CALL proc_stats_jobs_by_jobCategory('" + employerId + "','" + year + "','" + month + "')");
        })
        .then(function (jobsByJobCategories) {
            if (jobsByJobCategories) {
                jobsByJobCategories.forEach(function (jobsByJobCategory) {
                    getResponse.push(jobsByJobCategory);
                });
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at jobsByJobCategory ' + err);
        })
}