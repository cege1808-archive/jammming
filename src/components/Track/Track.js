import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      action: '+'
    }
  }
  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.title}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <a className="Track-action">{this.state.action}</a>
      </div>
    );
  }
}

export default Track;