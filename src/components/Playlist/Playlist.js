import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="Playlist">
        <input value="New Playlist" placeholder={this.props.name} />
        <TrackList tracks={this.props.tracks} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;