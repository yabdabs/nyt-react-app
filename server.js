// Youll need several Express routes for your app

// /api/saved (get) - your components will use this to query MongoDB for all saved articles

// /api/saved (post) - your components will use this to save an article to the database

// /api/saved (delete) - your components will use this to delete a saved article in the database

// * (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes

// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require Article schema
var Article = require("./models/Article");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3001;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// app.use(express.static("public"));

//for heroku react in place of static public route above
app.use(express.static("build"));

// // ==== if its production environment!
// if (process.env.NODE_ENV === 'production') {
// 	const path = require('path')
// 	console.log('YOU ARE IN THE PRODUCTION ENV')
// 	app.use('/static', express.static(path.join(__dirname, '../build/static')))
// 	app.get('/', (req, res) => {
// 		res.sendFile(path.join(__dirname, '../build/'))
// 	})
// }


app.get("/", function(req, res){ 
	res.sendFile(__dirname + "/build/static/index.html");
});
// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// /api/saved (get) - your components will use this to query MongoDB for all saved articles
app.get("api/saved", function(req,res){

	Article.find({}).exec(function(err, doc){

		if (error) {
			console.log(err);
		}
		else {
			res.send(doc);
		}
	});
});


// // /api/saved (post) - your components will use this to save an article to the database

app.post("/save", function(req, res){
	console.log(req.body[0])
	// res.send("hello!")
	var saveArticle = new Article(req.body[0]);

	saveArticle.save(function(err, data){
		// Send any errors to the browser
	    if (err) {
	      res.send(err);
	    }
	    // Otherwise, send the new doc to the browser
	    else {
	      res.send(data);
	    }
	})
});

app.get("/savedArticles", function(req, res){
	console.log("inside of /savedArticles server")
	Article.find({}).exec(function(err, data){
		if (err){
			console.log(err) 
		}
		else{
			res.json(data)
		}
	})
})
// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});