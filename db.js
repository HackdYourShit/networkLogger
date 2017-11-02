var mongoClient = require('mongodb').MongoClient;
var dateFormat = require('dateformat');

var mongoDbURL = "mongodb://appx:appx123@ds117935.mlab.com:17935/db_networklogger";

var collectionLogs = "Logs";


mongoClient.connect(mongoDbURL, function(error, db){

  if(error){
    return console.log(error);
  }

  //onSuccess
  console.log("Connected to Db.");

  var currentDateTime = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");

  //Insert
  db.collection(collectionLogs).insertOne({
    'timestamp': currentDateTime,
    state: 'down',
    downloadSpeed: '1.2',
    uploadSpeed: '5.0'
  });

  // Fetch
  var cursor = db.collection(collectionLogs).find();

  cursor.each(function(error, doc){

    console.log(doc);
  });

});

/*
db.collection(collectionLogs).insertOne({
  state: 'active',
  downloadSpeed: '4.2',
  uploadSpeed: '10.2'
});
*/
