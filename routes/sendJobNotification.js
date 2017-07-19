var FCM = require('fcm-push');

var db = require('../models');
var status = require("./resStatus");
var fcmMessage = require("../lib/fcmMessage");
var gMaps = require("../lib/gMapsFunctions");

var allFunctions = {};

var serverKey = "AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub";
//var token="feKA1sNZZ7A:APA91bE0yUde1c-B1CVzzNJlHs4W339uow47UKZ6e4JOlNZ-JAEsMG-U9Wj-d4gl3tFPVTfJUBNVFmOeYKaXbPnycAUMbyI_ylkLpqM5_9-yS2ZPhl-OHF8pAruOW_wXKLJ1lLYIQ0Pl";

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDj_PcOiD75vRxg-AfLnvY3raQJL-9In14',
    Promise: Promise
});

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

    message = {
        to: null,
        collapse_key: null,
        notification: {
            title: null,
            body: null
        },
        data: {}
    };

    var jobSeekerSubscriptionList = [];
    var jobPostalCode;

    Promise.resolve()
        .then(function () {
            return db.Jobs.findAll({
                include: [{ model: db.JobTypes }, { model: db.JobCategories }],
                where: { id: jobId }
            });
        })
        .then(function (jobData) {
            if (jobData) {
                var job = jobData[0].dataValues; //get all the info for posted job;
                jobPostalCode = job.postalCode;
                message.notification.title = job.title;
                message.data.jobId = job.id;
                message.data.employerId = job.employerId;

                //find all topic id's related to this job except distance
                return db.Topics.findAll({
                    where: { description: { $in: [job.jobType.description, job.jobCategory.description, job.city] } }
                })
            }
        })
        .then(function (topics) {
            if (topics) {
                var jobSeekerSubscriptionsPromises = [];
                topics.forEach(function (topicData) {
                    var topic = topicData.dataValues;
                    jobSeekerSubscriptionsPromises.push(
                        Promise.resolve()
                            .then(function () {
                                //get unique jobseekers for each topics
                                return db.JobSeekerSubscriptions.findAll({
                                    attributes: [[db.sequelize.fn('distinct', db.sequelize.col('jobSeekerId')), 'jobSeekerId']],
                                    where: { topicId: topic.id }
                                })
                            })
                            .then(function (jobSeekerSubscriptions) {
                                if (jobSeekerSubscriptions) {
                                    jobSeekerSubscriptions.forEach(function (jobSeekerSubscriptionData) {
                                        jobSeekerSubscriptionList.push(jobSeekerSubscriptionData.jobSeekerId);
                                    })
                                }
                            })
                            .catch(function (err) {
                                console.log('Error at JobSeekerSubscriptions ' + err);
                            })
                    );

                })
                return Promise.all(jobSeekerSubscriptionsPromises);
            }
        })
        .then(function () {
            //find all topic id's related to this job distance
            return db.JobSeekerSubscriptions.findAll({
                include: [{ model: db.JobSeekers }, { model: db.Topics, include: [{ model: db.TopicGroups, where: { internalCode: 'DISTANCE' }, required: true }] }]
            });
        })
        .then(function (jobSeekerSubscriptions) {
            if (jobSeekerSubscriptions) {
                //for each distance subscription calculate a distance.
                var jobSeekerSubscriptionsPromises = [];
                var newPromise = [];
                jobSeekerSubscriptions.forEach(function (jobSeekerSubscriptionData) {
                    var jobSeekerSubscription = jobSeekerSubscriptionData.dataValues;
                    if (jobSeekerSubscription.topic != null) {
                        return Promise.resolve()
                            .then(function () {
                                googleMapsClient.distanceMatrix({
                                    origins: [jobPostalCode], destinations: [jobSeekerSubscription.jobSeeker.postalCode]
                                })
                                    .asPromise()
                                    .then(function (gMapsData) {
                                        if (gMapsData) {
                                            console.log(gMapsData);
                                            return gMapsData;
                                        }
                                    })
                                    .catch(function (err) {
                                        console.log('Error at notifyJobPosting : jobSeekerSubscriptionsPromises' + err)
                                    })
                            })
                            .catch(function (err) {
                                console.log('Error at notifyJobPosting : jobSeekerSubscriptionsPromises' + err)
                            })
                    }
                });
                return Promise.all(jobSeekerSubscriptionsPromises);

            }
        })
        .then(function () {
            return db.JobSeekers.findAll({
                where: { id: { $in: [jobSeekerSubscriptionList] } }
            }); // get all job seekers || add more logic for notifying particular users
        })
        .then(function (jobSeekers) {
            if (jobSeekers) {
                var jobSeekersPromises = [];

                jobSeekers.forEach(function (jobSeekerData) {
                    var jobSeeker = jobSeekerData.dataValues;
                    message.notification.body = "Hi " + jobSeeker.firstName + ", You have a new job. Find More!"

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
                                return fcm.send(message); //message object is ready now then send it to a user.
                            })
                            .catch(function (err) {
                                console.log("error at jobSeekersPromises " + err);
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

function notifyJobStatusUpdate(jobApplicationId) {

    message = {
        to: null,
        collapse_key: null,
        notification: {
            title: null,
            body: null
        },
        data: {}
    };

    Promise.resolve()
        .then(function () {
            if (jobApplicationId) {
                return db.JobApplications.findAll({
                    where: { id: jobApplicationId },
                    include: [{ model: db.JobSeekers }, { model: db.Jobs }, { model: db.Employers }]
                });
            }
        })
        .then(function (jobApplicationsData) {
            if (jobApplicationsData) {
                var jobApplication = jobApplicationsData[0].dataValues;
                message.data.jobApplicationId = jobApplication.id;
                message.notification.title = jobApplication.Job.dataValues.title;
                message.notification.body = "Hi " + jobApplication.JobSeeker.dataValues.firstName + ", Your Job Application Status has been changed!"


                return Promise.resolve()
                    .then(function () {
                        return db.JobSeekerTokens.findAll({
                            where: { JobSeekerId: jobApplication.JobSeeker.id },
                        })
                    })
                    .then(function (jobSeekerTokenData) {
                        if (jobSeekerTokenData) {
                            var jobSeekerToken = jobSeekerTokenData[0].dataValues;
                            message.to = jobSeekerToken.token; //get the user tokken
                        }
                    })
                    .then(function () {
                        //send token only if valid token present
                        if (message.to) {
                            fcm.send(message);
                        }
                    })
                    .catch(function (err) {
                        console.log('Error at notifyJobStatusUpdate - jobApplicationsData  ' + err);
                    });

            }
        })
        .catch(function (err) {
            console.log('Error at notifyJobStatusUpdate ' + err);
        })


}


allFunctions.notifyJobStatusUpdate = notifyJobStatusUpdate;
allFunctions.notifyJobPosting = notifyJobPosting;

module.exports = allFunctions;


