import axios from 'axios';

var URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
var apiKey = "450688d465524dce95edd99b25bb0a1b";
var queryURL = URL + apiKey

const helper = {
	nytQuery: function(searchQuery, startDate, endDate){
		console.log("Search Query " + searchQuery);

		return axios.get(queryURL, {
			pararms:{
				q: searchQuery,
				begin_date: startDate,
				end_date: endDate
			}
		})
	}
}

export default helper; 