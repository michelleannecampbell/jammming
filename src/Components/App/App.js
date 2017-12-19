import React, { Component } from 'react';
import './App.css';
import TrackList from '../TrackList/TrackList';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      playlistName: 'Humpty Dump',
      playlistTracks: [
        {
          name: 'Michelle',
          artist: 'The Beatles',
          album: 'White Album',
        }
      ],
      searchResults: [
        {
          id: 1,
          name: 'Petit Biscuit',
          artist: 'Petit Biscuit',
          album: 'Petit Biscuit'
        },
        {
          id: 2,
          name: 'Petit Biscuit',
          artist: 'Petit Biscuit',
          album: 'Petit Biscuit'
        },
        {
          id: 3,
          name: 'Petit Biscuit',
          artist: 'Petit Biscuit',
          album: 'Petit Biscuit'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults : searchResults});
    });
  }

  savePlaylist() {
     const trackUris = this.state.playlistTracks.map(track => track.uri);
     Spotify.savePlaylist().then(playlistTracks => {
       this.setState({
       playlistName : 'New Playlist',
       playlistTracks: []
     });
     });
   }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  addTrack(track){
    console.log(track);
    let isInPlaylist = false;
    this.state.playlistTracks.forEach(playlistTrack => {
      if (track.id == playlistTrack.id){
        isInPlaylist = true;
      }
    })
    if(!isInPlaylist){
      let playlistTracks = this.state.playlistTracks;
      playlistTracks.push(track);
      this.setState({
        playlistTracks: playlistTracks
      })
    }
  }

  removeTrack(track){
      for(let i= 0; i < this.state.playlistTracks.length; i++ ){
        if(track.id == this.state.playlistTracks[i].id){
          let playlistTracks = this.state.playlistTracks;
          playlistTracks.splice(i, 1);
          this.setState({
            playlistTracks: playlistTracks
          })
        }
      }
    }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
