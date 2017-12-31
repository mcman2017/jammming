import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../../Components/TrackList/TrackList';

class Playlist extends Component {
    constructor(props){
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
}

  onNameChange(event) {
       this.props.onNameChange(event.target.value);
}
  render() {
    return (
<div className="Playlist">
  <input value={this.props.playlistName}
         onChange={this.onNameChange} />
    <TrackList tracks={this.props.playlistTracks} 
                onRemove={this.props.onRemove}/> 
  <a className="Playlist-save" 
     onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    );
  }
}

export default Playlist;
