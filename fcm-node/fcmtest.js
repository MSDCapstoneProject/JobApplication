/**
 * Created by Leonardo on 02/08/2016.
 */
FCM = require('fcm-node');


var SERVER_API_KEY='AIzaSyCQg3uJkrvp1ecrSlsov11yWTWN2RQAXXo';//put your api key here

var validDeviceRegistrationToken = 'AAAA_ISrvWA:APA91bG2HrjB2eXSsN8cNEt_2TOUqFvPN9CE0-Wm8o9th0wcSd63MDXaMLAiyXCVI7kkkdB6dEULNZeph3fGjl5Xcee863D360C9_UVE7DkMy2aVdppqYBSy68V4jAsOMa0Sdo32u6ub'; //put a valid device token here




var fcmCli= new FCM(SERVER_API_KEY);

var message = {

    to: validDeviceRegistrationToken,
        data:{
            message1: "FCM Message 111",
            message2: "FCM Message 222"

        },
};

fcmCli.send(message, function(err, messagID){

    if(err){
        console.log("Fail");
    }else{
        console.log("Success"+ messageId);
    }
});