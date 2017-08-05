import React from 'react'
import helpers from '../utils/helpers';
import Search from './search.js';
import Results from './results.js';
import SavedArticles from './saved.js'
import { Route, Link } from 'react-router-dom';


class Main extends React.Component{
	constructor(){
		super();

		this.state = {
			searchResults: [],
			savedArticles: []
		}
	}


	makeRequest = (searchQuery, startDate, endDate) => {
		console.log("Request being made")
		console.log(this.state)

		//what does it bind to when we use arrow function?
		//if we don't use arrow function, we need to explicitly bind it, why? what does it refer to?
		helpers.nytQuery(searchQuery, startDate, endDate)
			.then((response) =>{
				console.log("AXIOS CALL")
				console.log(response);

				var article = response.data.response.docs;
				var articlesArray = [];

				for(var i=0; i<article.length-1; i++){
					if (article[i].headline.main && article[i].pub_date && article[i].web_url){
						articlesArray.push(article[i]);	
					}
					// articlesArray.push(article[i])
				}
				console.log("ARTICLES 5")
				console.log(articlesArray)

				this.setState({
					searchResults: articlesArray
				})

				console.log(this.state.searchResults)
			});
	}

	saveArticle = (event, index) => {
		event.preventDefault();

		var chosenArticle = this.state.searchResults[index.i]
		console.log(chosenArticle)

		//put necessary info into an array and pass it into database
		var chosenArticleInfo = []

		var title = chosenArticle.headline.main
		var	date = chosenArticle.pub_date
		var url = chosenArticle.web_url

		chosenArticleInfo.push({title:title, date:date, url:url})
		console.log("CHOSEN ARTICLE INFO")
		console.log(chosenArticleInfo)

		helpers.saveArticle(chosenArticleInfo)
			.then(results => {
				console.log(results)
			})

		helpers.loadSavedArticles()
			.then((response) =>{
				console.log(response)
				this.setState({
					savedArticles: response.data
				})
			})
	}

	//once the component is mounted to the DOM we run what is inside 
	componentDidMount(){
		//axios request to database
		helpers.loadSavedArticles()
			.then((response) =>{
				console.log(response)
				this.setState({
					savedArticles: response.data
				})
			})
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

					<Results
						articles = {this.state.searchResults}	saveArticle = {this.saveArticle}
					/>

					<SavedArticles savedArticles = {this.state.savedArticles}
					/>
					
				</div>
			</div>

		)
	}
}

export default Main;