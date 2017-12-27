import React from 'react';
import Track from '../Track';
import './assets/css/style.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
            />
          );
        })}
      </div>
    );
  }
}
export default TrackList;
