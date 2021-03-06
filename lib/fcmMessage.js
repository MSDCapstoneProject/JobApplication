var db = require("../models");
var status = require("../routes/resStatus");
var FCM = require('fcm-push');

var fcmMessage = {};

var serverKey = "AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub";
//var token = "feKA1sNZZ7A:APA91bE0yUde1c-B1CVzzNJlHs4W339uow47UKZ6e4JOlNZ-JAEsMG-U9Wj-d4gl3tFPVTfJUBNVFmOeYKaXbPnycAUMbyI_ylkLpqM5_9-yS2ZPhl-OHF8pAruOW_wXKLJ1lLYIQ0Pl";

var fcm = new FCM(serverKey);

var clientMessage = {};

function sendMessage(message) {

    return Promise.resolve
        .then(function () {
            clientMessage = {}; //clear the earlier message.

            clientMessage = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: message.token,
                collapse_key: 'your_collapse_key',
                //collapse_key to prevent duplicate message
                notification: {
                    title: message.title,
                    body: message.body
                },
                data: message.data //you can send only notification or only data(or include both)  my_key: 'my value',
            }

        })
        .then(function () {
            return fcm.send(clientMessage);
        })
        .catch(function (err) {
            console.log('Error at fcmMessage ' + err);
        });

}

fcmMessage.sendMessage = sendMessage;

module.exports = fcmMessage;

//var FCM = require('fcm-node');
//var firebase = require("firebase");


/*
var formidable = require('formidable');
var serverKey="AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub"; 
// var serverKey="AIzaSyDfaLZhGo1ORqsCqOPohsEwG8jh9YgU5ew";
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);
var data=req.body;
var message="Hey! you got this notification.";
var title="DigitSTORY Notification";
var token="feKA1sNZZ7A:APA91bE0yUde1c-B1CVzzNJlHs4W339uow47UKZ6e4JOlNZ-JAEsMG-U9Wj-d4gl3tFPVTfJUBNVFmOeYKaXbPnycAUMbyI_ylkLpqM5_9-yS2ZPhl-OHF8pAruOW_wXKLJ1lLYIQ0Pl";
var fcm = new FCM(serverKey);
*/
/*
 * send Push
 */
//exports.send = function (req, res) {

   /* 
       var message = { 
        to: token, 
        notification: {
            title: title, //title of notification 
            body: message, //content of the notification
            sound: "default",
            icon: "ic_launcher" //default notification icon
        },
        data: data //payload you want to send with your notification
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Notification not sent");
            res.json({success:false})
        } else {
            console.log("Successfully sent with response: ", response);
            res.json({success:true})
        }
    });
 
*/

//}