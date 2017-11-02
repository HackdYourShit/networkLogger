var speedTest = require('speedtest-net');
var mongoClient = require('mongodb').MongoClient;
var dateFormat = require('dateformat');

// Speed Test Config
var test = speedTest({maxTime: 5000});

// MongoLab Config
var mongoDbURL = "mongodb://appx:appx123@ds117935.mlab.com:17935/db_networklogger";
var collectionLogs = "Logs";

// Local Fields
var downloadSpeed = "";
var uploadSpeed = "";
var internetProvider = "";
var internetProviderIP = "";

// Call Network Test
networkTesting();

function networkTesting() {

  test.on('testserver', function(server){
    pingTime = server.bestPing;
  });

  test.on('data', function(data){

    downloadSpeed = data.speeds.download + ' Mbps';
    uploadSpeed = data.speeds.upload + ' Mbps';
    internetProvider = data.client.isp;
    internetProviderIP = data.client.ip;

    console.log("Download Speed ", downloadSpeed);
    console.log("Upload Speed ", uploadSpeed);
    console.log("ISP ", internetProvider);
    console.log("ISP ", internetProviderIP);
    console.log("Latitude ", data.client.lat);
    console.log("Longitude ", data.client.lon);

    // Connect to mongodb
    logToMongoDb();
  });

  test.on('error', function(error){
    console.log(error);
  });

}


function logToMongoDb() {

  mongoClient.connect(mongoDbURL, function(error, db){

    if(error){
      return console.log("Db Connection :"+error);
    }

    //onSuccess
    console.log("Connected to MongoDb");

    // Current Date&Time
    var currentDateTime = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");

    //Insert
    db.collection("Logs").insertOne({
      timeStamp: currentDateTime,
      state: 'UP',
      internetProvider: internetProvider,
      internetIP: internetProviderIP,
      downloadSpeed: downloadSpeed,
      uploadSpeed: uploadSpeed
    }, function(error, response){

      if(error){
        return console.log("Record Insertion : "+error);
      }

      //Successfully Created
      console.log("Record Instered to Db :)");
    });

  });
}
