export interface AudioFeatures {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
}

export interface AudioFeaturesData {
    danceability: number[];
    energy: number[];
    key: number[];
    loudness: number[];
    mode: number[];
    speechiness: number[];
    acousticness: number[];
    instrumentalness: number[];
    liveness: number[];
    valence: number[];
    tempo: number[];
  }

export interface ArtistImage {
  width: number;
  height: number;
  url: string;
}

export interface Artist {
    id: string;
    name: string;
    images: ArtistImage[];
}


export interface ArtistData extends Artist {
    featuresMedian: AudioFeatures;
}

export interface RelatedArtist {
  genres: string[],
  followers: Followers,
  id: string,
  href: string,
  images: ArtistImage[],
  name: string,
  popularity: number,
}

export interface RelatedArtistNode {
  artist: RelatedArtist,
  level: number,
  parent: string,
}

export interface RelatedArtistTree {
  nodes: RelatedArtistNode[],
  levelLengths: number[],
  smallestArtist: string,
}

export interface Followers {
  href: string,
  total: number,
}