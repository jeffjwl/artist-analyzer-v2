import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import CircularProgress from "@mui/material/CircularProgress";
import useDebounce from "../hooks/useDebounce";
import useArtistSearch from "../hooks/useArtistSearch";
import SearchOptions from "./SearchOptions";


interface propTypes {
    chooseArtist: React.Dispatch<React.SetStateAction<any>>;
}
const SearchBar = ({chooseArtist}: propTypes) => {
  const [currSearch, setCurrSearch] = useState("");
  const [options, setOptions] = useState([]);
  const debouncedSearch = useDebounce(currSearch, 300);


  const { isLoading, data, error, refetch } = useArtistSearch(debouncedSearch);

  useEffect(() => {
      if(data) {
        setOptions(data.searchResult);
      }
  }, [data]);

  return (
    <>
    <TextField
    value={currSearch}
      onChange={(e: any) => {
        setCurrSearch(e.target.value);
      }}
    label="Asynchronous"
    InputProps={{
      endAdornment: (
        <>
          {isLoading && currSearch ? (
            <CircularProgress color="inherit" size={20} />
          ) : null}
        </>
      ),
    }}
  />
  {currSearch && options && !isLoading && <SearchOptions options={options} chooseArtist={chooseArtist} />}
  </>
  );
};

export default SearchBar;
