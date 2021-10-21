import React, { useState } from 'react';

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

function SpotifyTrack(props: RawTrackType) {
  const [removedState, setRemovedState] = useState(false);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setRemovedState(!removedState);
    console.log("click")
  };
  
  return (
    <li key={props.track.id}>
      <img src={props.track.album.images[2].url} alt={"Cover of " + props.track.album.name} />
      <p>{props.track.name}</p>
      <button onClick={buttonHandler}>
        {removedState ? "Add to favs" : "Remove from favs"}
      </button>
    </li>
  );
}

export default SpotifyTrack;
