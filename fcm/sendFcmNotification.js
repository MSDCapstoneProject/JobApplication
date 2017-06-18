var status = require("../routes/resStatus");
var FCM = require('fcm-push');
//var status = require('./routes/resStatus');

var serverKey = "AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub";
var token = "eTn7KXL677g:APA91bGmjuHDf03QdP_dewa5qh_LIOu2QUnc8UAAxSVCi9jtf1kOt8rXZymUFyruF0eW3gy2ZubWcZeorpV2z23jGs6Rx2DBPgCo2j-v088czA_Z_vqkm-NN3Dbbqs5vrxuhlzOcSHJ3";


var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: token,
    collapse_key: 'your_collapse_key',
    //collapse_key to prevent duplicate message
    notification: {
        title: 'Title of push message2',
        body: 'This is an important message2'
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

   // res.json({ status: status.SUCCESS });

};
