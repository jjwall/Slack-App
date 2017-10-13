var path = require("path");
var mongojs = require("mongojs");

// Routes
// =============================================================
module.exports = function(app) {

	// Database Configuration
	//var databaseUrl = "slackdb"; // -> local DB address
	// var databaseUrl = "mongodb://heroku_rcltfz79:62vr2u59dknavnl1njtas4s35n@ds135252.mlab.com:35252/heroku_rcltfz79"; // heroku DB address
	//var collections = ["messageSpaces"];

	// Hook mongojs config to db variable
	//var db = mongojs(databaseUrl, collections);

	//var testDatabase = ["test1", "test2", "test3"];

	//var dbKeys = [];

	// app.on('listening', function(req,res) {
	// 	db.messageSpaces.find({}, {"_id": 0, "name": 0}, function(error, data) {
	// 		if (error) {
	// 	    console.log(error);
	// 	  }
	// 	  else {
	// 			for (var i = 0; i < data.length; i++) {
	// 	    	//console.log(data[i].key);
	// 				dbKeys.push(data[i].key);
	// 			}
	// 			//console.log(dbKeys);
	// 			//loadChannels();
	// 	  }
	// 	});
	// 	console.log(res);
	// })

	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	// for (var i = 0; i < testDatabase.length; i++) {
	// 	app.get(`/${testDatabase[i]}`, function(req, res) {
	// 		res.sendFile(path.join(__dirname, "../public/message.html"));
	// 	});
	// }

	app.get("/messagespace/:key", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/message.html"));
	})

	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/error.html"));
	});

};
