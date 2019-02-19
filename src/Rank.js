import React, {Component} from "react";
import axios from 'axios';
import Sortable from 'react-sortablejs';
import uniqueId from 'lodash/uniqueId';

class Rank extends Component{
  constructor(props) {
  	super(props);
  	this.state = {
  	  ranks: Array.from(this.props.articles.keys()),
      error: false
  	};
  	this.handleSubmit = this.handleSubmit.bind(this);

  }

  //Submit the ranked articles numbers
  handleSubmit(event) {
  	axios.post('https://my-json-server.typicode.com/albertus-andito/bbc-web/articlesRank', {
      rank1: this.props.articles.get(this.state.ranks[0]),
      rank2: this.props.articles.get(this.state.ranks[1]),
      rank3: this.props.articles.get(this.state.ranks[2])
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      this.setState({
        error: true
      });
      console.log(error);
    });
  	event.preventDefault();
  }

  render(){
  	const items = this.state.ranks.map(val => (<li className="liRank" key={uniqueId()} data-id={val}>{val}</li>));
    return(
      <div className="rank">
        <p>Rank</p>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Sortable
              tag="ul"
              className="ulRank"
              onChange={(order, sortable, evt) => {
                this.setState({ ranks: order });
              }}
            >
              {items}
            </Sortable>
            <input className="rightButton button" type="submit" value="Submit" />
          </form>
        </div>
        <div>
          {this.state.error ? <h2>An error has occured. Check your internet connection</h2> : null}
        </div>
      </div>
    )
  }
}

export default Rank;