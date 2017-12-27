import React from 'react';
import TrackList from '../TrackList';
import './assets/css/style.css';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}
export default SearchResults;
