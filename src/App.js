import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import axios from 'axios';


class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Articles Ranker </h1>

        <Article />
      </div>
    );
  }
}

class Article extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      body: []
    };

  }

  componentWillMount() {
	axios.get('./data/article-5.json')
	  .then(res => {
	    // handle success
	    const body = res.data.body.map(obj => obj)
	    this.setState({
	    	title: res.data.title,
	    	body: body
	    });
	    console.log(body);
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  })
	  .then(function () {
	    // always executed
  	});
  }
  render(){
  	return(
  	  <div>
	    <h2>{this.state.title}</h2>
	    <div>
	     {this.state.body.map((obj, index) => (
	     	<ArticleComp key={index} type={obj.type} model={obj.model} />
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
		let comp = <p>hi</p>;
		if(this.props.type == "heading"){
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

export default App;