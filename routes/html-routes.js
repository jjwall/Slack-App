var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

	var testDatabase = ["test1", "test2", "test3"];

	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	for (var i = 0; i < testDatabase.length; i++) {
		app.get(`/${testDatabase[i]}`, function(req, res) {
			res.sendFile(path.join(__dirname, "../public/message.html"));
		});
	}

	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/error.html"));
	});

};
