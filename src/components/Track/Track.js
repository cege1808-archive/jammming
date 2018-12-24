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
    const track = this.props.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        <a className="Track-action">{this.state.action}</a>
      </div>
    );
  }
}

export default Track;