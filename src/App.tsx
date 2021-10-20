import React from 'react';
import './App.css';
import SpotifyList from './SpotifyList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Spotify favorator
        </h1>
      </header>
      <SpotifyList />
    </div>
  );
}

export default App;
