interface RawTrackType {
    track: TrackType;
  };
  type TrackType = {
    id: string;
    name: string;
    album: AlbumType;
  };
  type AlbumType = {
    id: string;
    name: string;
    images: ImageType[];
  };
  type ImageType = {
    height: number;
    width: number;
    url: string;
  };
  
  export type { RawTrackType, TrackType, AlbumType, ImageType }