import React from 'react'
import helpers from '../utils/helpers';
import Search from './search.js';

class Main extends React.Component{
	constructor(){
		super();

		this.state = {
			searchResults: []
		}
	}

	makeRequest = (searchQuery, startDate, endDate) => {
		console.log("Request being made")
		console.log(this.state)

		helpers.nytQuery(searchQuery, startDate, endDate)
			.then(function(response){
				console.log("AXIOS CALL")
				console.log(response);

				var article = response.data.response.docs;
				
				var articlesArray = [];

				for(var i=0; i<5; i++){
					// if (articles[i].headline.main && responseResults[counter].pub_date && responseResults[counter].web_url){
					// 	results.push(responseResults[counter]);	
					// }
					articlesArray.push(article[i])
				}
				console.log("ARTICLES 5")
				console.log(articlesArray)

				this.setState({
					searchResults: articlesArray
				})

				console.log(this.state.searchResults)
			});
	}

	render(){
		return(


			<div className="main-container">
				<div className="jumbotron">
					<h1 className="text-center"> New York Times Search </h1>
					<p className="lead text-center"> A React based app to search for and save New York Times Articles using Mongo DB and and Mongoose ORD </p> 
				</div>
				<div className="container">
					<Search 
						makeRequest ={this.makeRequest}
					/>

					
				</div>
			</div>

		)
	}
}

export default Main;