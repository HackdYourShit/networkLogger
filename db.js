var mongoClient = require('mongodb').MongoClient;

var mongoDbURL = "mongodb://appx:appx123@ds117935.mlab.com:17935/db_networklogger";

var collectionLogs = "Logs";

mongoClient.connect(mongoDbURL, function(error, db){

  if(error){
    return console.log(error);
  }

  //onSuccess
  console.log("Connected to Db.");

  db.collection(collectionLogs).insertOne({
    state: 'active',
    downloadSpeed: '4.2',
    uploadSpeed: '10.2'
  });
});
