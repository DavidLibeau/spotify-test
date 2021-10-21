import React, { useEffect, useState } from 'react';
import './App.css';
import SpotifyTrack from './SpotifyTrack';

interface RawTrackType {
  track: TrackType;
}
interface TrackType {
  id: string;
  name: string;
  album: AlbumType;
}
interface AlbumType {
  id: string;
  name: string;
  images: ImageType[];
}
interface ImageType {
  height: number;
  width: number;
  url: string;
}

function SpotifyList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Array<RawTrackType>>([]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
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
      <div>
        <p>{items.length} favs loaded</p>
        <ul>
          {items.map(item => (
            <SpotifyTrack track={item.track} />
          ))}
        </ul>
      </div>
    );
  }
}

export default SpotifyList;
