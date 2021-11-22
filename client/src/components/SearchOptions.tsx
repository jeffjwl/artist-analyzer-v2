import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Artist } from '../models/types';
import PersonIcon from '@mui/icons-material/Person';

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

interface propTypes {
    options: Artist[];
    chooseArtist: React.Dispatch<React.SetStateAction<any>>;
}

const SearchOptions = ({ options, chooseArtist }: propTypes) => {
  return (
    <List sx={style} aria-label="search options">
      {options.map((option: Artist, index: number) => {
        const isEdge = index === 0 || index === options.length - 1;
        return (
          <>
            {!isEdge && <Divider variant="inset" component="li" />}
            <ListItem key={option.name} button onClick={() => chooseArtist(option.id)}> 
            {option.images.length > 0 ?
              <ListItemAvatar>
                <Avatar src={option.images[option.images.length - 1].url} />
              </ListItemAvatar>
              :
              <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
              </ListItemAvatar>
            }
              <ListItemText primary={option.name} />
            </ListItem>
            {!isEdge && <Divider variant="inset" component="li" />}
          </>
        );
      })}
    </List>
  );
};

export default SearchOptions;
