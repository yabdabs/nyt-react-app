import React from 'react'
import helpers from '../utils/helpers.js'

//this component will display all of the saved articles in the database
class SavedArticles extends React.Component{
	constructor(){
		super();

	}
	
	render(){

		//why did I have to put all this in the render?? It was inside component did mount before but didn't work
		const stateSavedArticles = this.props.savedArticles
		console.log("STATE")
		console.log(stateSavedArticles)

		//article is the value of the current element
  	//i is the array index of the current element
  	{/*onClick={(event) => props.saveArticle(event, {i})*/}
		const renderSavedArticles = stateSavedArticles.map((article, i) =>
      <div id={stateSavedArticles[i]._id} key= {stateSavedArticles[i].title +i} className="articles">
        <h3><a href = {stateSavedArticles[i].url} target="_blank">{stateSavedArticles[i].title}</a></h3>
        <button type="button" className="btn btn-success">Delete </button>
      </div>
  	)//close map function

		return(
			<div>
					<h1>Saved Articles</h1>
					{renderSavedArticles}
			</div>
		)
		
	}
}

export default SavedArticles