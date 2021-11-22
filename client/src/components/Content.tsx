import React, { useState } from "react";
import SearchSection from "./SearchSection";
import Chart from "./Chart";
import { ArtistData } from "../models/types";
import ArtistList from "../components/ArtistList";

function Content() {
  const [chosenArtists, setChosenArtists] = useState<ArtistData[]>([]);

  return (
    <div className="Content">
      <SearchSection
        chosenArtists={chosenArtists}
        setChosenArtists={setChosenArtists}
      />
      {chosenArtists.length > 0 && (
        <ArtistList
          chosenArtists={chosenArtists}
          setChosenArtists={setChosenArtists}
        />
      )}
      {chosenArtists.length > 0 && <Chart chosenArtists={chosenArtists} />}
    </div>
  );
}

export default Content;
