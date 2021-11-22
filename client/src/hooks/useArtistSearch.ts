import { useQuery } from "react-query";
import axios from "axios";

const getArtistSearch = async (name: string) => {
  if (!name) {
    return;
  }
  const { data } = await axios.get(
    `http://localhost:5000/api/search?name=${name}`
  );
  return data;
};

export default function useArtistSearch(name: string) {
  return useQuery(["search suggestions", name], () => getArtistSearch(name));
}
