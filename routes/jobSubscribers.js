var db = require("../models");
var status = require("./resStatus");

var routes = {};
var getResponse = [];
var method;
var response = {};

exports.list = function (req, res) {
    getResponse = [];
    var jobSeekerId = re.query.id || req.params.id; // Check what request you are going to get

    Promise.resolve()
        .then(function () {
            if (jobSeekerId) {
                return db.JobSubscribers.findAll({
                    attributes: { exclude: ['createdAd', 'updatedAt', 'deletedAt'] },
                    where: { JobSeekerId: jobSeekerId }
                });
            } else {
                return db.JobSubscribers.findAll({
                    attributes: { exclude: ['createdAd', 'updatedAt', 'deletedAt'] }
                });
            }
        })
        .then(function (jobSubscribers) {
            if (jobSubscribers) {
                var employerPromises = [];
                jobSubscribers.forEach(function (jobSubscribersData) {
                    var jobSubscriber = jobSubscribersData.dataValues;
                    getResponse.push(jobSubscriber);
                    jobSubscriber.Employer = {};
                    jobSubscriber.Job = {};
                    jobSubscriber.JobSeeker = {};
                    employerPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.Employers.findAll({
                                    attributes: { exclude: ['createdAd', 'updatedAt', 'deletedAt'] },
                                    where: { id: jobSubscriber.EmployerId }
                                });
                            })
                            .then(function (employerData) {
                                if (employerData) {
                                    var employer = {};
                                    employer = employerData.dataValues;
                                    jobSubscriber.Employer = employer;
                                }
                                return db.Jobs.findAll({
                                    attributes: { exclude: ['createdAd', 'updatedAt', 'deletedAt'] },
                                    where: { JobId: jobSubscriber.EmployerId }
                                });
                            })
                            .catch(function (err) {
                                console.log("Error at get jobSubscribers " + err);
                            })


                    );
                });
                return Promise.all(employerPromises);
            }

        })
        .then(function () {

        })
        .catch(function (err) {

        });
}