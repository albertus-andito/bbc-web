import React, {Component} from "react";
import {hot} from "react-hot-loader";
import axios from 'axios';
import "./App.css";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    	nums: this.randomNumber(5),
    	i: -1,
    	showArticle: true
    }
    this.incrementI = this.incrementI.bind(this);
    this.decrementI = this.decrementI.bind(this);
    this.goToRank = this.goToRank.bind(this);
  }

  incrementI(){
  	this.setState({
  	  i: this.state.i+1,
  	  showArticle: true
  	})
  }

  decrementI(){
  	this.setState({
  	  i: this.state.i-1,
  	  showArticle: true
  	})
  }

  goToRank(){
  	this.setState({
  		showArticle: false,
  		i: this.state.i+1
  	})
  }

  randomNumber(n) {
    var nums = [];
    while (nums.length < 3) {
      var num = Math.floor(Math.random()*n) + 1;
      if (nums.indexOf(num) === -1) {
      	nums.push(num);
      }
    }
    return nums;
  }

  render(){
  	let leftButton;
  	let rightButton;
  	if (this.state.i > 0 && this.state.i < 3) {
  		leftButton = <PrevButton handler={this.decrementI} />
  	}
  	if (this.state.i < 2) {
  	 rightButton = <NextButton handler={this.incrementI}/>
  	} else if (this.state.i == 2) {
  	 rightButton = <RankButton handler={this.goToRank}/>
  	}
    return(
      <div className="app">
        <h1>ARTICLES RANKER</h1>
        <div className="body">
          <li>{this.state.nums[0]}</li>
          <li>{this.state.nums[1]}</li>
          <li>{this.state.nums[2]}</li>
          <p>Welcome to the articles ranker. Please read through all 3 articles and rank them at the end.</p>
          {this.state.showArticle ? <Article articleNo={this.state.nums[this.state.i]}/> : <Rank />}
          {leftButton}
          {rightButton}
          <p>{this.state.i}</p>
        </div>
      </div>
    );
  }
}

class Rank extends Component{
  constructor(props) {
  	super(props);
  	this.state = {
  	  rank1: 0,
  	  rank2: 0,
  	  rank3: 0
  	};
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  	const name = event.target.name;
  	this.setState({
  		[name]: event.target.value
  	})
  }

  handleSubmit(event) {
  	axios.post('https://my-json-server.typicode.com/albertus-andito/bbc-web/articlesRank', {
      rank1: this.state.rank1,
      rank2: this.state.rank2,
      rank3: this.state.rank3
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  	event.preventDefault();
  }

  render(){
    return(
      <div>
        <p>Rank</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Rank 1:
            <input name="rank1" type="text" value={this.state.rank1} onChange={this.handleChange}/>
          </label>
          <label>
            Rank 2:
            <input name="rank2" type="text" value={this.state.rank2} onChange={this.handleChange}/>
          </label>
          <label>
           Rank 3:
            <input name="rank3" type="text" value={this.state.rank3} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

class PrevButton extends Component{
  render(){
  	return(
  	  <div>
  	    <button type="button" onClick={this.props.handler}>Prev article</button>
  	  </div>
  	)
  }
}

class NextButton extends Component{
  render(){
  	return(
  	  <div>
  	    <button type="button" onClick={this.props.handler}>Next article</button>
  	  </div>
  	)
  }
}

class RankButton extends Component{
  render(){
  	return(
  	  <div>
  	    <button type="button" onClick={this.props.handler}>Rank articles</button>
  	  </div>
  	)
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

  componentDidUpdate(nextProps) {
  	if (this.props.articleNo != nextProps.articleNo) {
	  axios.get('./data/article-'+this.props.articleNo+'.json')
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
  }
  render(){
  	return(
  	  <div>
	    <h2 className="article">{this.state.title}</h2>
	    <div className="article">
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

export default App;