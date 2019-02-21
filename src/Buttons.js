import React, {Component} from "react";

class PrevButton extends Component{
  render(){
  	return(
  	  <div>
  	    <button type="button" className="leftButton button" onClick={this.props.handler}>Prev article</button>
  	  </div>
  	)
  }
}

class NextButton extends Component{
  constructor(props) {
  	super(props)
  }

  render(){
  	let text;
  	if (this.props.i == -1) {
  		text = "Start reading";
  	} else {
  		text = "Next article";
  	}
  	return(
  	  <div>
  	    <button type="button" className="rightButton button" onClick={this.props.handler}>{text}</button>
  	  </div>
  	)
  }
}

class RankButton extends Component{
  render(){
  	return(
  	  <div>
  	    <button type="button" className="rightButton button" onClick={this.props.handler}>Rank articles</button>
  	  </div>
  	)
  }
}

export {PrevButton, NextButton, RankButton};