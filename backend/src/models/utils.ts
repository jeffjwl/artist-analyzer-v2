import { apiController } from "./apiController";
import {
  Artist,
  AudioFeatures,
  AudioFeaturesData,
  ArtistData,
  RelatedArtist,
  RelatedArtistTree,
  RelatedArtistNode,
} from "./types";

export const searchArtists = async (name: string): Promise<Artist[]> => {
  const res: any = await apiController.get(
    `/search?q=${name}&type=artist&limit=8`
  );
  const {
    artists: { items },
  } = res;
  const artists: Artist[] = items.map(({ id, name, images }: Artist) => ({
    id,
    name,
    images,
  }));
  return artists;
};

export const getAudioFeatures = async (
  artistId: string
): Promise<AudioFeatures[]> => {
  //@ts-ignore
  const topTracks = await getTopTracksArtist(artistId);

  const formattedIds: string[] = topTracks
    .map((track: { id: number }) => track.id)
    .join(",");
  //@ts-ignore
  const { audio_features } = await apiController.get(
    `/audio-features/?ids=${formattedIds}`
  );

  return audio_features;
};

export const getTopTracksArtist = async (artistId: string): Promise<any> => {
  // @ts-ignore
  const { tracks } = await apiController.get(
    `/artists/${artistId}/top-tracks?market=US`
  );

  return tracks;
};

const getMedian = (values: number[]) => {
  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

export const getAudioFeaturesMedian = (
  audioFeatures: AudioFeatures[]
): AudioFeatures => {
  const featuresData: AudioFeaturesData = {
    danceability: [],
    energy: [],
    key: [],
    loudness: [],
    mode: [],
    speechiness: [],
    acousticness: [],
    instrumentalness: [],
    liveness: [],
    valence: [],
    tempo: [],
  };

  audioFeatures.forEach((feature) => {
    for (const key in feature) {
      if (featuresData.hasOwnProperty(key)) {
        const castedKey = key as keyof AudioFeatures;
        //@ts-ignore
        featuresData[castedKey].push(feature[castedKey]);
      }
    }
  });

  const featuresMedian: AudioFeatures = {
    danceability: getMedian(featuresData["danceability"]),
    energy: getMedian(featuresData["energy"]),
    key: getMedian(featuresData["key"]),
    loudness: getMedian(featuresData["loudness"]),
    mode: getMedian(featuresData["mode"]),
    speechiness: getMedian(featuresData["speechiness"]),
    acousticness: getMedian(featuresData["acousticness"]),
    instrumentalness: getMedian(featuresData["instrumentalness"]),
    liveness: getMedian(featuresData["liveness"]),
    valence: getMedian(featuresData["valence"]),
    tempo: getMedian(featuresData["tempo"]),
  };

  return featuresMedian;
};

export const getArtistData = async (artistId: string): Promise<ArtistData> => {
  const { id, name, images }: Artist = await apiController.get(
    `/artists/${artistId}`
  );

  const audioFeatures = await getAudioFeatures(artistId);

  return {
    id,
    name,
    images,
    featuresMedian: getAudioFeaturesMedian(audioFeatures),
  };
};

export const getRelatedArtists = async (
  artistId: string
): Promise<RelatedArtist[]> => {
  //@ts-ignore
  const { artists } = await apiController.get(
    `/artists/${artistId}/related-artists`
  );
  const relatedArtists = artists
    ? artists.map(
        ({
          genres,
          followers,
          id,
          href,
          images,
          name,
          popularity,
        }: RelatedArtist) => ({
          genres,
          followers,
          id,
          href,
          images,
          name,
          popularity,
        })
      )
    : artists;
  return relatedArtists;
};

export const getMostObscure = async (
  artistId: string,
  minPop: number = 101,
  minFollowers: number = Number.MAX_SAFE_INTEGER,
  recurArray: RelatedArtistNode[] = [],
  levelLengths: number[] = [1],
  level: number = 1
): Promise<RelatedArtistTree> => {
  if ((minPop < 1 && minFollowers < 1000) || level >= 50) {
    return {
      nodes: recurArray,
      levelLengths: levelLengths,
      smallestArtist: artistId,
    };
  }

  const relatedArtists = await getRelatedArtists(artistId);
  let localMinpop = minPop;
  let localMinFollowers = minFollowers;
  let counter = 0;
  let nextArtist = artistId;
  for (const artist of relatedArtists) {
    if (artist.popularity < minPop || artist.followers.total < minFollowers) {
      recurArray.push({ artist: artist, level: level, parent: artistId });
      counter++;
    }
    if (artist.popularity <= localMinpop) {
      localMinpop = artist.popularity;
      if (artist.followers.total < localMinFollowers) {
        nextArtist = artist.id;
      }
    }
    if (artist.followers.total < localMinFollowers) {
      localMinFollowers = artist.followers.total;
    }
  }
  if (counter !== 0) {
    levelLengths.push(counter);
  }
  if (nextArtist === artistId) {
    return {
      nodes: recurArray,
      levelLengths: levelLengths,
      smallestArtist: artistId,
    };
  }

  return getMostObscure(
    nextArtist,
    localMinpop,
    localMinFollowers,
    recurArray,
    levelLengths,
    level + 1
  );
};

export const startDTRB = async (
  artistId: string
): Promise<RelatedArtistTree> => {
  //@ts-ignore
  const { genres, followers, id, href, images, name, popularity }: Artist =
    await apiController.get(`/artists/${artistId}`);
  return getMostObscure(artistId, popularity, followers.total, [
    {
      artist: { genres, followers, id, href, images, name, popularity },
      level: 0,
      parent: id,
    },
  ]);
};
