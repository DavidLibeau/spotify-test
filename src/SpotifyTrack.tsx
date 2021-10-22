import React, { useState } from 'react';
import type { RawTrackType, TrackType, AlbumType, ImageType } from './CommonType';

function SpotifyTrack(props: RawTrackType) {
  const [removedState, setRemovedState] = useState(false);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    fetch("https://api.spotify.com/v1/me/tracks?ids="+button.getAttribute("data-id"), {
      method: removedState ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_TOKEN,
        'Content-Type': ' application/json'
      }
    })
      .then(res => {
        console.log(res);
        if(res.status==200){
          setRemovedState(!removedState);
        }
      })
    console.log("click")
  };
  
  return (
    <li key={props.track.id} className={removedState ? "removed" : ""}>
      <img src={props.track.album.images[2].url} alt={"Cover of " + props.track.album.name} />
      <p>{props.track.name}</p>
      <button onClick={buttonHandler} data-id={props.track.id}>
        {removedState ? "Add to favs" : "Remove from favs"}
      </button>
    </li>
  );
}

export default SpotifyTrack;
