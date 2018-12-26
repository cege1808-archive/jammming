import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './utilities/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    }
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  search(term){
    console.log(`Search Spotify with ${term}`);
    Spotify.search(term).then(tracks =>{
      console.log(tracks);
      this.setState({searchResults: tracks});
    })
  }
  addTrack(track){
    //console.log("add track to playlist");
    let currentPlaylist = this.state.playlistTracks;
    if(currentPlaylist.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    else{
      currentPlaylist.push(track);
      this.setState({playlistTracks: currentPlaylist});
    }
    console.log(this.state.playlistTracks);
  }
  removeTrack(track){
    //console.log("remove track from playlist");
    let currentPlaylist = this.state.playlistTracks;
    this.setState({playlistTracks: currentPlaylist.filter(savedTrack => savedTrack.id !== track.id)});
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  savePlaylist(){
    //console.log("save playlist");
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
  }
  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
