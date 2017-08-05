import React from 'react';

const Results = (props) => {
    const articles = props.articles;

    console.log("ARTICLES FROM RESULTS COMPONENT")
    console.log(articles)
  
      //article is the value of the current element
      //i is the array index of the current element
      var renderArticles = articles.map((article, i) =>
        <div id={i} key= {article.headline.main + i} className="articles">
          <h3><a href = {article.web_url} target="_blank">{article.headline.main}</a></h3>
          <button type="button" className="btn btn-success" onClick={(event) => props.saveArticle(event, {i})}>Save </button>
        </div>
      )//close map function

  return(
    <div>
      <h1>Results</h1>
      {renderArticles}
    </div>
  )
}
export default Results;