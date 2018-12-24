import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="TrackList">
        <Track title="Tiny Dancer" artist="Ben Folds" album="Ben Folds Live" />
      </div>
    )
  }
}

export default TrackList;