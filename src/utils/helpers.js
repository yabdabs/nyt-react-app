import axios from 'axios';

var URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
var apiKey = "450688d465524dce95edd99b25bb0a1b";
var queryURL = URL + apiKey

const helper = {
	//query to nyt api
	nytQuery: function(searchQuery, startDate, endDate){
		console.log("Search Query " + searchQuery);

		return axios.get(queryURL, {
			pararms:{
				q: searchQuery,
				begin_date: startDate,
				end_date: endDate
			}
		})
	},

	//helper function that uses route in server.js page to save article
	saveArticle: function(chosenArticle){
		console.log("CHOSEN ARTICLE IN HELPER:")
		console.log(chosenArticle)
		return axios.post("/save", chosenArticle);
	},

	loadSavedArticles: function(){
		console.log("Inside of load articled function--inside saved articles component")

		return axios.get('/savedArticles')
	}
}

export default helper; 