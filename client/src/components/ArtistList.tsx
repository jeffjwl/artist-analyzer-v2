import React, {useState, useEffect} from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { ArtistData } from "../models/types";
import PersonIcon from "@mui/icons-material/Person";

interface propTypes {
  chosenArtists: ArtistData[];
  setChosenArtists: React.Dispatch<React.SetStateAction<any>>;
}

const ArtistList = ({ chosenArtists, setChosenArtists }: propTypes) => {

  const handleDelete = (index: number) => {
    let removedArr = chosenArtists;
    console.log("removedArr", removedArr);
    removedArr.splice(index, 1);
    console.log("removedArr2", removedArr);
    setChosenArtists([...removedArr]);  
  };

  useEffect(() => {
    console.log("yo", chosenArtists);
  }, [chosenArtists])
  return (
    <Stack direction="row" spacing={1}>
      {chosenArtists.map((e: ArtistData, index: number) =>
        e.images.length > 0 ? (
          <Chip
            avatar={
              <Avatar alt={e.name} src={e.images[e.images.length - 1].url} />
            }
            label={e.name}
            onDelete={() => handleDelete(index)}
          />
        ) : (
          <Chip
            icon={<PersonIcon />}
            label={e.name}
            onDelete={() => handleDelete(index)}
          />
        )
      )}
    </Stack>
  );
};

export default ArtistList;
