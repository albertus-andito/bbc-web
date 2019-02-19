import React, {Component} from "react";
import {hot} from "react-hot-loader";
import axios from 'axios';
import "./App.css";

import Rank from "./Rank.js";
import {PrevButton, NextButton, RankButton} from "./Buttons.js";
import {Article, ArticleComp} from "./Article.js";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    	nums: this.randomNumber(5),
    	i: -1,
    	showArticle: true,
    	articles: new Map()
    }
    this.nextArticle = this.nextArticle.bind(this);
    this.prevArticle = this.prevArticle.bind(this);
    this.goToRank = this.goToRank.bind(this);
    this.updateTitles = this.updateTitles.bind(this);
  }

  nextArticle(){
  	this.setState({
  	  i: this.state.i+1,
  	  showArticle: true
  	})
  }

  prevArticle(){
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

  //Store the titles and numbers of articles that are shown
  updateTitles(title, articleNo){
  	this.setState({
  	  articles: this.state.articles.set(title, articleNo)
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
  		leftButton = <PrevButton handler={this.prevArticle} />
  	}
  	if (this.state.i < 2) {
  	 rightButton = <NextButton handler={this.nextArticle} i={this.state.i}/>
  	} else if (this.state.i == 2) {
  	 rightButton = <RankButton handler={this.goToRank}/>
  	}
    return(
      <div className="app">
        <h1>ARTICLES RANKER</h1>
        <div className="body">
          {this.state.showArticle ? <Article handler={this.updateTitles} articleNo={this.state.nums[this.state.i]} i={this.state.i}/> : <Rank articles={this.state.articles}/>}
          <div className="buttonsContainer">
            {leftButton}
            {rightButton}
          </div>
        </div>
      </div>
    );
  }
}

export default App;