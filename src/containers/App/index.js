import React from 'react';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import Playlist from '../../components/Playlist';
import Spotify from '../../util/Spotify';
//import logo from './assets/img/favicon.ico';
import './assets/css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.push(track);

    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  // Update playlist name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  //  save playlist to Spotify
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    if (this.state.playlistName && trackURIs && trackURIs.length > 0) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        console.log(
          `Your new playlist with '${this.state.playlistName}' and ${
            trackURIs.length
          } songs are successfully saved to your account.`
        );
        this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>

        <div className="App">
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />

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
