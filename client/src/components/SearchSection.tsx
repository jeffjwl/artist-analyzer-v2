import React, { useEffect, useState } from "react";
import useArtistData from "../hooks/useArtistData";
import SearchBar from "./SearchBar";
import { ArtistData } from "../models/types";

interface propTypes {
  chosenArtists: ArtistData[];
  setChosenArtists: React.Dispatch<React.SetStateAction<any>>;
}
const SearchSection = ({ chosenArtists, setChosenArtists }: propTypes) => {
  const [chosenArtist, setChosenArtist] = useState("");

  const { isLoading, data, error } = useArtistData(chosenArtist);

  useEffect(() => {
    if (chosenArtist && data) {
      console.log(chosenArtists);
      const artistData = data.artistData;
      if (!chosenArtists.includes(artistData)) {
        setChosenArtists([...chosenArtists, artistData]);
      }
    }
  }, [chosenArtist, data]);

  return <SearchBar chooseArtist={setChosenArtist} />;
};

export default SearchSection;
