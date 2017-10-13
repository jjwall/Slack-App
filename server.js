// Dependencies
var dotenv = require('dotenv').config();
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var dbKeys = [];

var app = express();
var PORT = process.env.PORT || 8080;

// var herokuConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   databaseURL: process.env.databaseURL,
//   storageBucket: process.env.storageBucket
// };

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static Directory
app.use(express.static("./public"));

// Database Configuration
var databaseUrl = "slackdb"; // -> local DB address
// var databaseUrl = "mongodb://heroku_rcltfz79:62vr2u59dknavnl1njtas4s35n@ds135252.mlab.com:35252/heroku_rcltfz79"; // heroku DB address
var collections = ["messageSpaces"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Routes
// require("./routes/html-routes.js")(app);
// var devConfig = require("./public/javascript/config.js");
// console.log(devConfig.apiKey);

// var configFb = devConfig || herokuConfig;
//
// var app = firebase.initializeApp(configFb);
//
// var database = firebase.database();

function loadSpace(req, res, next) {
	//console.log("key equals: " + req.params.key);
	//console.log("hey there good lookin");
	if (req.params.key) {
		db.messageSpaces.findOne({}, {"_id": 0, "name": 0}, function(error, data) {
			if (error) {
	    	console.log(error);
				next(new Error("Couldn't find message space: " + error));
				return;
	  	}
	  	else {
				// req.key = key;
				// next();
				console.log("YOU DID IT!!!");
				// for (var i = 0; i < data.length; i++) {
		    // 	//console.log(data[i].key);
				// 	dbKeys.push(data[i].key);
				// }
				//console.log(dbKeys);
				//loadChannels();
	  	}
		});
	}
}

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/home.html"));
});

app.get("/messagespace/:key", loadSpace, function(req, res) {
	res.sendFile(path.join(__dirname, "/public/message.html"));
	console.log(req.params);
});

app.get("/error", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/error.html"));
});

//Handle sign data submission, save submission to mongo
app.post("/api/messageSpaces", function(req, res) {
	console.log(req.body);
	// Insert the sign into the signs collection
	db.messageSpaces.insert(req.body, function(error, saved) {
		// Log any errors
		if (error) {
			console.log(error);
		}
		// Otherwise, send the sign back to the browser
		// This will fire off the success function of the ajax request
		else {
			res.send(saved);
		}
	});
});

// Retrieve ALL results from mongo
app.get("/api/all", function(req, res) {
  // Find all notes in the notes collection
  db.messageSpaces.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// db.messageSpaces.find({}, {"_id": 0, "name": 0}, function(error, data) {
// 	if (error) {
//     console.log(error);
//   }
//   else {
// 		for (var i = 0; i < data.length; i++) {
//     	console.log(data[i].key);
// 			app.get(`/${data[i].key}`, function(req, res) {
// 				res.sendFile(path.join(__dirname, "public/message.html"));
// 			});
// 		}
//   }
// });

console.log(dbKeys);

function doThisPlease() {
	db.messageSpaces.find({}, {"_id": 0, "name": 0}, function(error, data) {
		if (error) {
	    console.log(error);
	  }
	  else {
			for (var i = 0; i < data.length; i++) {
	    	//console.log(data[i].key);
				dbKeys.push(data[i].key);
			}
			//console.log(dbKeys);
			//loadChannels();
	  }
	});
}

// Start express app
app.listen(PORT, function() {
	console.log(`app listening on port ${PORT}`);
	//console.log(dbKeys)
});
