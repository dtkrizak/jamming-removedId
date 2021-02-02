//import logo from '../../logo.svg';
import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from  '../Playlist/Playlist';
import Spotify from "../../util/Spotify/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist 1',
      playlistTracks:  []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
  }

  addTrack(newTrack) {
    let tracks = this.state.playlistTracks;
    //checks that the track is not already in the playlist
    if (tracks.find(track => track.id === newTrack.id)){
      return;
    } 
    
    tracks.push(newTrack);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(trackToRemove) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(track => track.id !== trackToRemove.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    console.log('Successfully enters savePlaylist method in App', trackUris);
    //calls the savePlaylist function to save to Spotify and then resets the playlist
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      console.log(term, searchResults);
      this.setState({searchResults: searchResults});
      this.removeDuplicates();
    });
  }

  removeDuplicates() {
    let playlistTracks = this.state.playlistTracks
    let tracks = this.state.searchResults;
    let duplicate;
    let results = [];
    tracks = tracks.map(track => {
      duplicate = false;
      playlistTracks.map(existingTrack => {
        if(track.id == existingTrack.id){
          duplicate = true;
        }
      });
      if(!duplicate){
        results.push(track);
      } else {
        duplicate = false;
      }
    });
    console.log('Results: ', results);
    this.setState({ searchResults: results });
  }

  render() { 
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  } 
}

export default App;
