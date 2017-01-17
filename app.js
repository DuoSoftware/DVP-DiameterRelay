'use strict';

var diameter = require('diameter');
const avp = require('diameter-avp-object');
var config = require('config');


var serverRealm = 'example.org';
var serverHost = config.Services.billingServiceHostIP;
var serverPort =  config.Services.billingServicePort;

var relayRealm = 'example.com';
var relayHost = config.Host.vdomain || 'localhost';
var relayPort = config.Host.port || 3000;
var relayIP = config.Host.ip || '127.0.0.1';


var optionsAsTcpServer = {
    beforeAnyMessage: diameter.logMessage,
    afterAnyMessage: diameter.logMessage
};

var optionsAsTcpClient = {
    beforeAnyMessage: diameter.logMessage,
    afterAnyMessage: diameter.logMessage,
    host: serverHost,
    port: serverPort
};



var server = diameter.createServer(optionsAsTcpServer, function(socket) {
    socket.on('diameterMessage', processDiameterMessages);

    socket.on('end', function() {
        console.log('Client disconnected.');
    });
    socket.on('error', function(err) {
        console.log(err);
    });
});

server.timeout = 5000;


var relayToServerSocket = diameter.createConnection(optionsAsTcpClient, function() {

    var connection = relayToServerSocket.diameterConnection;
    var request = connection.createRequest('Diameter Common Messages', 'Capabilities-Exchange');
    request.body = request.body.concat([
        [ 'Origin-Host', relayHost ],
        [ 'Origin-Realm', relayRealm ],
        [ 'Vendor-Id', 10415 ],
        [ 'Origin-State-Id', 219081 ],
        [ 'Supported-Vendor-Id', 10415 ],
        [ 'Auth-Application-Id', 'Diameter Credit Control' ]
    ]);
    connection.sendRequest(request).then(function(response) {
        const avpObj = avp.toObject(response.body);
        console.log(avpObj)
        if(avpObj.resultCode=='DIAMETER_SUCCESS'){
            //console.log('sdsdsdsdqqqqqcddcdc')

        }
    }, function(error) {
        console.log('Error sending request: ' + error);
    });

});

relayToServerSocket.on("diameterMessage", processDiameterMessages);



function processDiameterMessages(event) {

    if (event.message.command === 'Capabilities-Exchange') {
        event.response.body = event.response.body.concat([
            ['Result-Code', 'DIAMETER_SUCCESS'],
            ['Origin-Host', relayHost],
            ['Origin-Realm', relayRealm],
            ['Host-IP-Address', relayIP],
            ['Acct-Application-Id', 'Relay'],
            ['Auth-Application-Id', 'Relay'],
            ['Product-Name', 'node-diameter-relay-0.1']
        ]);
        event.callback(event.response);
    }
    if (event.message.command === 'Device-Watchdog') {
        event.response.body = event.response.body.concat([
            ['Result-Code', 'DIAMETER_SUCCESS'],
            ['Origin-Host', relayHost],
            ['Origin-Realm', relayRealm]
        ]);
        event.callback(event.response);
    }


    if (event.message.command=='Credit-Control'){
        event.message.body = event.message.body.concat([
            ['Route-Record', relayHost]]);

        event.response.body = event.response.body.concat([
            ['Origin-HOST', relayHost], // or AVP names, this is 'Origin-Host'
            ['Origin-Realm', relayRealm],
            ['Auth-Application-Id', 'Diameter Credit Control'],
            ['CC-Request-Type', 'EVENT_REQUEST'],
            ['CC-Request-Number', 0]
        ]);



        var hopByHopID = event.message.header['hopByHopId'];
        console.log('This is hop id');
        console.log(hopByHopID);
        relayToServerSocket.diameterConnection.sendRequest(event.message).then(function(response) {
            response.header['hopByHopId'] = hopByHopID;
            event.callback(response);
        }, function(error) {
            console.log('Error sending request: ' + error);
        });
    }


}

server.listen(relayPort, relayHost);
console.log('Started DIAMETER Relay on ' + relayHost + ':' + relayPort);
