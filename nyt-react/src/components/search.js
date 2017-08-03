import React, { Component } from 'react'
//do I put this in the main or search??
import helpers from '../utils/helpers';
import { Route, Link } from 'react-router-dom';
import saved from './saved.js'

class Search extends React.Component{
	constructor(){
		super();

		this.state = {
			searchQuery: "",
			startDate: "",
			endDate: ""
		}
	}

	// This function will respond to the user input


  	handleChange = event => {
			console.log(event.target.value);
			console.log(event.target.id);
			// alert("HandleChange")
			this.setState({
				[event.target.id] : event.target.value
			});
		}

  	// when the user clicks the submit button
  	handleSubmit = event => {
  		event.preventDefault();
  		console.log(this.state);

  		// Here we create syntax to capture any change in text to the query terms (pre-search).
	    // See this Stack Overflow answer for more details:
	    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
	    var newState = {};
	    newState[event.target.id] = event.target.value;
	    this.setState(newState);
  		alert("submit button has been clicked")

  		this.props.makeRequest(this.state.searchQuery, this.state.startDate, this.state.endDate)
  	}


	render(){
		console.log(this.state)
		return(

			<div className="panel panel-default">
			  <div className="panel-heading">
			    <h3 className="panel-title">Search Parameters</h3>
			  </div>

			  <div className="panel-body">
			  	<form>
		    		<div className="form-group">
		    			<label for= "searchQuery"> Search Query</label>
		    			<input type= "text" className="form-control" id="searchQuery" value={this.state.searchQuery} onChange={this.handleChange}/>
		    		</div>

		    		<div className="form-group">
		    			<label for= "startDate"> Start Date: </label>
		    			<input type= "number" className="form-control" id="startDate" value={this.state.startDate} onChange={this.handleChange}/>
		    		</div>

		    		<div className="form-group">
		    			<label for= "endDate"> End Date: </label>
		    			<input type= "number" className="form-control" id="endDate" value={this.state.endDate} onChange={this.handleChange}/>
		    		</div>
		    		<button className="btn btn-primary" type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>

		    	{/*	<button type="button" className="btn btn-default"><Link to="/savedArticles">Saved Articles</Link></button>
							<Route exact path="/savedArticles" component={saved} />*/}
		    	</form>

			  </div>
			</div>

		)
	}
}

export default Search;