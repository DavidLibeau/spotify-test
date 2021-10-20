import React, { useEffect, useState } from 'react';
import './App.css';

interface PlaylistType {
  id: string;
  name: string;
}

function SpotifyList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Array<PlaylistType>>([]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN,
        'Content-Type': ' application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return (
      <div>Error: {error}</div>
    );
  } else if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      );
  }
}

export default SpotifyList;
