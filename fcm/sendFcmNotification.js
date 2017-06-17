var FCM = require('fcm-push');

var serverKey = "AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub";
var token = "feKA1sNZZ7A:APA91bE0yUde1c-B1CVzzNJlHs4W339uow47UKZ6e4JOlNZ-JAEsMG-U9Wj-d4gl3tFPVTfJUBNVFmOeYKaXbPnycAUMbyI_ylkLpqM5_9-yS2ZPhl-OHF8pAruOW_wXKLJ1lLYIQ0Pl";

//var token ="evm7P6piK0M:APA91bHNTN30J4103eg-fpNHlekMusyqUYLxlV09HDVv2j7EdbThCW7PuKn4SEXHZZRzrAIo4jqwJ1FbaMSbpaclPTYLawS99MQC9QJImp0W6nhb8xUs-xT2637Q-Zpnie4GAgvnmhMa";

var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: token,
    collapse_key: 'your_collapse_key',
    //collapse_key to prevent duplicate message
    notification: {
        title: 'Title of push message',
        body: 'This is an important message'
    },

    data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
}


exports.send = function (req, res) {
    //moved to exports.send because it will send only when it gets a request on /fcm/sendNotifications
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    });

    res.json({ status: status.SUCCESS });

};
