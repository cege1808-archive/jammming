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
      playlistName: "",
      playlistTracks: []
    }
    this.search = this.search.bind(this);
  }
  search(term){
    console.log(`Search Spotify with ${term}`);
    Spotify.search(term).then(tracks =>{
      console.log(tracks);
      this.setState({searchResults: tracks});
    })
  }
  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults results={this.state.searchResults} />
          <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} />
        </div>
      </div>
    );
  }
}

export default App;
