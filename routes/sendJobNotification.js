var FCM = require('fcm-push');

var db = require('../models');
var status = require("./resStatus");
var fcmMessage = require("../lib/fcmMessage");

var allFunctions = {};

var serverKey = "AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub";
//var token="feKA1sNZZ7A:APA91bE0yUde1c-B1CVzzNJlHs4W339uow47UKZ6e4JOlNZ-JAEsMG-U9Wj-d4gl3tFPVTfJUBNVFmOeYKaXbPnycAUMbyI_ylkLpqM5_9-yS2ZPhl-OHF8pAruOW_wXKLJ1lLYIQ0Pl";

var fcm = new FCM(serverKey);

var message = {
    to: null,
    collapse_key: null,
    notification: {
        title: null,
        body: null
    },
    data: {}
};

function notifyJobPosting(jobId) {

    Promise.resolve()
        .then(function () {
            return db.Jobs.findAll({ where: { id: jobId } });
        })
        .then(function (jobData) {
            if (jobData) {
                var job = jobData[0].dataValues; //get all the info for posted job;
                message.notification.title = job.title;
                message.data.jobId = job.id;
                message.data.employerId = job.EmployerId;
                return db.JobSeekers.findAll(); // get all job seekers || add more logic for notifying particular users
            }
        })
        .then(function (jobSeekers) {
            if (jobSeekers) {
                var jobSeekersPromises = [];

                jobSeekers.forEach(function (jobSeekerData) {
                    var jobSeeker = jobSeekerData.dataValues;
                    message.notification.body = "Hi " + jobSeeker.firstName + ", You have new job. Find More & View Details!"

                    jobSeekersPromises.push(
                        Promise.resolve()
                            .then(function () {
                                return db.jobSeekerTokens.findAll({ where: { JobSeekerId: jobSeeker.id } });
                            })
                            .then(function (jobSeekerTokenData) {
                                if (jobSeekerTokenData) {
                                    var jobSeekerToken = jobSeekerTokenData[0].dataValues;
                                    message.to = jobSeekerToken.token; // get of jobSeekers unique token for each user
                                }
                                //implement code to update job notification data;
                            })
                            .then(function () {
                                fcm.send(message); //message object is ready now then send it to a user.
                            })
                            .catch(function (err) {
                                console.log("error at jobSeekersPromises" + err);
                            })
                    );
                });
                return Promise.all(jobSeekersPromises);
            }
        })
        .catch(function (err) {
            console.log('Error at notifyJobPosting ' + err);
        });
}

allFunctions.notifyJobPosting = notifyJobPosting;

module.exports = allFunctions;


