import React, {Component} from "react";
import axios from 'axios';
import uniqueId from 'lodash/uniqueId';

class Article extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      body: []
    };

  }

  //Get the article in form of json file
  componentDidUpdate(nextProps) {
  	if (this.props.articleNo != nextProps.articleNo) {
	  axios.get('./data/article-'+this.props.articleNo+'.json')
	    .then(res => {
	      const body = res.data.body.map(obj => obj)
	      this.setState({
	    	  title: res.data.title,
	    	  body: body
	      });
	      this.props.handler(res.data.title, this.props.articleNo);
	      //console.log(body);
	    })
	    .catch(error => {
        this.setState({
          title: "A network error has occured. Check your internet connection",
          body: []
        })
	      console.log(error);
	    })
	}
	
  }
  render(){
  	let articleNumber;
  	if (this.props.i > -1) {
  		articleNumber = <h2>Article {this.props.i+1}</h2>
  	}
  	return(
  	  <div className="article">
  	  	<p>Welcome to the articles ranker. Please read through all 3 articles and rank them at the end.</p>
  	  	{articleNumber}
	      <h2>{this.state.title}</h2>
	      <div>
          {this.state.body.map((obj, index) => (
	     	    <ArticleComp key={uniqueId()} type={obj.type} model={obj.model} />
	        ))}
	      </div>
      </div>
  	)
  }
}

class ArticleComp extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let comp;
    if (this.props.type == "heading") {
      comp = <h3>{this.props.model.text}</h3>;
    } else if (this.props.type == "paragraph") {
      comp = <p>{this.props.model.text}</p>;
    } else if (this.props.type == "image") {
      comp = <img src={this.props.model.url} alt={this.props.model.altText} />
    } else if (this.props.type == "list") {
      const listItems = this.props.model.items.map((item) =>
        <li>{item}</li>
      );
      comp = <ul>{listItems}</ul>;
    }
    return(
      <div>
        {comp}
      </div>
    )
  }
}

export {Article, ArticleComp};