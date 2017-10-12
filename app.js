var speedTest = require('speedtest-net');

var test = speedTest({maxTime: 5000});

test.on('testserver', function(server){
  pingTime = server.bestPing;
});

test.on('data', function(data){

  var downloadSpeed = data.speeds.download + ' Mbps';
  var uploadSpeed = data.speeds.upload + ' Mbps';

  console.log("Download Speed ", downloadSpeed);
  console.log("Upload Speed ", uploadSpeed);
  console.log("ISP ", data.client.isp);
  console.log("ISP ", data.client.ip);
  console.log("Latitude ", data.client.lat);
  console.log("Longitude ", data.client.lon);

});

test.on('error', function(error){

  console.log(error);
});
