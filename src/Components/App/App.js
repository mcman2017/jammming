import React, { Component } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchResults: [],
       playlistName: "New Playlist",
       playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
 }

  addTrack (newtrack) {
   let tracks = this.state.playlistTracks;
    if (!tracks.includes(newtrack)) {
      newtrack.isRemoval = true;
      tracks.push(newtrack);
      console.log(`adding this-->${newtrack}`);
      this.setState({playlistTracks: tracks});
    }
 }

  removeTrack (remtrack) {
  let tracks = this.state.playlistTracks;
    if (tracks.includes(remtrack)) {
      remtrack.isRemoval = false;
      tracks.pop(remtrack);
      this.setState({playlistTracks: tracks});
    }
}

   updatePlaylistName (name) {
      this.setState( { playlistName: name } );
      console.log(`Hey, we are updating the Play name to ${name}`);

}

    savePlaylist () {
     var trackURIs = [];
     this.state.playlistTracks.slice().forEach(function(track,i,a)  {
        if (track &&  track.uri) {
             trackURIs.push( track.uri );
         }
    });
    Spotify.savePlaylist ( this.state.playlistName, trackURIs);
    this.setState( { playlistName: "New Playlist" } );
    this.setState( { playlistTracks: [] } );
    this.setState( { searchResults: [] } );
}

   search (searchTerm) {
    if (searchTerm) {
      console.log(`This is my search term ${searchTerm}`);
     Spotify.search(searchTerm).then(
              newTrack => {
                   this.setState({ searchResults: newTrack });
   } 
   );
   }
}


  render() {
    return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
   <SearchBar onSearch={this.search} />
    <div className="App-playlist">
       <SearchResults searchResults={this.state.searchResults} 
                      onRemove={this.removeTrack}
                      onAdd={this.addTrack} />
       <Playlist playlistName={this.state.playlistName}
                 playlistTracks={this.state.playlistTracks} 
                 onRemove={this.removeTrack}
                 onNameChange={this.updatePlaylistName} 
                 onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
