var MONGO_ADDRESS = "mongodb://localhost:27017/test",
	MONGO_COLLECTION = "test";

var MongoClient = require("mongodb").MongoClient;


function insertDocument(bookId, callback){

	//connect the mongo database
	MongoClient.connect(MONGO_ADDRESS, function(err, db){

		if(err){
			callback(err);
		}

		var collection = db.collection(MONGO_COLLECTION);

		collection.count({"id": bookId}, function(err, count){
			if(count === 1){
				callback("This book is alreay exist");
			}else{
				callback(null, bookId, collection);	

			}
		});	

	})

}



exports.insertDocument = insertDocument;

