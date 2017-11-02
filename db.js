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

  // Fetch
  var cursor = db.collection(collectionLogs).find();

  cursor.each(function(error, doc){
  
    console.log(doc);
  });

});
