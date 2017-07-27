var mongoose =  require("mongoose")

var Schema = mongoose.Schema;

var Article = new Schema({

	"title": {
		"type": String,
		"required": true
	},
	"date": {
		type: String,
		"required": true
	},
	"url": {
		type: String,
		"required": true
	}
})

var Article = mongoose.model("Article", Article)

module.exports = Article; 