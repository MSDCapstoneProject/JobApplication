var db = require("../models");
var status = require("./resStatus");

var getResponse = [];

exports.list = function (req, res) {
    var jobSeekerId = req.params.jobSeekerId || req.query.jobSeekerId;
    var jobSeekerNotificationId = req.params.id || req.query.id;
    getResponse = [];
    Promise.resolve()
        .then(function () {
            if (jobSeekerId) {
                return db.JobSeekerNotification.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    include: [{ model: JobSeeker }, { model: Topics }],
                    where: { JobSeekerId: jobSeekerId }
                })
            } else if (jobSeekerNotificationId) {
                return db.TopicGroups.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    where: { id: jobSeekerNotificationId }
                })
            }
        })
        .then(function (jobSeekerNotifications) {
            if (jobSeekerNotifications) {
                jobSeekerNotifications.forEach(function (jobSeekerNotificationData) {
                    var jobSeekerNotification = jobSeekerNotificationData.dataValues;
                    getResponse.push = jobSeekerNotification;
                });
            }
        })
        .then(function () {
            res.json(getResponse);
        })
        .catch(function (err) {
            console.log('Error at get jobSeekerNotification')
        })

}
