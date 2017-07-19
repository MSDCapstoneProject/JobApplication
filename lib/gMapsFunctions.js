//var googleMapsClient = require('@google/maps');

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDj_PcOiD75vRxg-AfLnvY3raQJL-9In14',
    Promise: Promise
});

var https = require('https');

var options = {
    host: 'maps.googleapis.com',
    port: 443,
    path: '/maps/api/distancematrix/json',
    method: 'GET'
};

//https://maps.googleapis.com/maps/api/distancematrix/json?origins=N2A2M4&destinations=N2G 4M4&key=AIzaSyCKCvlh6XA4im3PXjo3ZGbNdkkOQ9LwQ70

var allFunctions = {};

function getDistance(origin, destination, value) {
    /*return Promise.resolve()
        .then(function () {
            return googleMapsClient.distanceMatrix({
                origins: [origin], destinations: [destination]
            })
        })
        .then(function (response) {
            if (response) {
                console.log('here');
            }
        })
        .catch(function (err) {
            console.log('err');
        }) */


    return Promise.resolve()
        .then(function () {
            googleMapsClient.distanceMatrix({
                origins: [origin], destinations: [destination]
            })
                .asPromise()
                .then(function (response) {
                    if (response) {
                        /*console.log(googleMapsClientData.rows[0].elements[0].distance.value);
                        var actualDistance = googleMapsClientData.rows[0].elements[0].distance.value;*/
                        
                        if (actualDistance < value) {
                            return flag = true;
                        } else {
                            return flag = false;
                        }
                    }
                })
                .catch(function (err) {
                    console.log('Error at ' + err);
                })
        })
        .then(function (flag) {
            console.log('Here');
        })
        .catch(function (err) {
            console.log('Error at ' + err);
        })


}

allFunctions.getDistance = getDistance;

module.exports = allFunctions;
