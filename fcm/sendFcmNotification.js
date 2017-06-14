var FCM = require('fcm-push');

var serverKey = "AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub";
var token = "feKA1sNZZ7A:APA91bE0yUde1c-B1CVzzNJlHs4W339uow47UKZ6e4JOlNZ-JAEsMG-U9Wj-d4gl3tFPVTfJUBNVFmOeYKaXbPnycAUMbyI_ylkLpqM5_9-yS2ZPhl-OHF8pAruOW_wXKLJ1lLYIQ0Pl";

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