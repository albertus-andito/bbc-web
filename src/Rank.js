import React, {Component} from "react";
import axios from 'axios';
import Sortable from 'react-sortablejs';
import uniqueId from 'lodash/uniqueId';

class Rank extends Component{
  constructor(props) {
  	super(props);
  	this.state = {
  	  ranks: Array.from(this.props.articles.keys()),
<<<<<<< HEAD
      error: false,
      submitted: false
=======
>>>>>>> 070ce93378428e928dd73a1f739f0790f7db3efa
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
<<<<<<< HEAD
      this.setState({
        error: false,
        submitted: true
      });
      console.log(response);
=======
>>>>>>> 070ce93378428e928dd73a1f739f0790f7db3efa
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
<<<<<<< HEAD
        <p>Please rank the articles by dragging the titles</p>
=======
>>>>>>> 070ce93378428e928dd73a1f739f0790f7db3efa
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
<<<<<<< HEAD
            {this.state.submitted ? null : <input className="rightButton button" type="submit" value="Submit" />}
          </form>
        </div>
        <div className="afterSubmission">
          {this.state.error ? <h3>An error has occured. Check your internet connection</h3> : null}
          {this.state.submitted ? <SubmitSuccess goToBeginning={this.props.goToBeginning}/> : null}
=======
>>>>>>> 070ce93378428e928dd73a1f739f0790f7db3efa
        </div>
      </div>
    )
  }
}

<<<<<<< HEAD
class SubmitSuccess extends Component {
  render(){
    return(
      <div class="centerDiv">
        <h3>Your ranking has been submitted.</h3>
        <button type="button" className="button centerButton" onClick={this.props.goToBeginning}>Start again</button>
      </div>
    )
  }
}

=======
>>>>>>> 070ce93378428e928dd73a1f739f0790f7db3efa
export default Rank;