import React, { useEffect, useState } from 'react';
import SpotifyTrack from './SpotifyTrack';
import type { RawTrackType } from './CommonType';

function SpotifyList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [items, setItems] = useState<Array<RawTrackType>>([]);

  const loadMoreHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loadSpotifyFavs(true)
  };

  const loadSpotifyFavs = (addToExisting:boolean) => {
    var previousItems: any[] = [];
    if(addToExisting){
      previousItems = items;
    }
    fetch("https://api.spotify.com/v1/me/tracks?limit=50&offset=" + nextPage, {
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN,
        'Content-Type': ' application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.error) {
            setError(result.error.message);
          } else {
            if (result.offset + result.limit < result.total) {
              setNextPage(result.offset + result.limit);
            } else {
              setNextPage(0);
            }
            setItems(previousItems.concat(result.items));
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  useEffect(() => {
    loadSpotifyFavs(false);
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
        <ul className="SpotifyList">
          {items.map(item => (
            <SpotifyTrack track={item.track} />
          ))}
        </ul>
        <div>
          {nextPage > 0 ? <button onClick={loadMoreHandler}>Load more</button> : <span>All favs loaded</span>}
        </div>
      </div>
    );
  }
}

export default SpotifyList;
