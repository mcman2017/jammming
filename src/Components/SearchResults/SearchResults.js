import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../../Components/TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return (
<div className="SearchResults">
  <h2>Results</h2>
    <TrackList tracks={this.props.searchResults}
               onAdd={this.props.onAdd}
               onRemove={this.props.onRemove} />
    {console.log(`SR and ${this.props.onAdd}`)}
</div>
    );
  }
}

export default SearchResults;

