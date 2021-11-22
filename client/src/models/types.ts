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

 