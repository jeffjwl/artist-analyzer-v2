import { useQuery } from "react-query";
import axios from "axios";

const getArtistData = async (id: string) => {
  if (!id) {
    return;
  }
  const { data } = await axios.get(
    `http://localhost:5000/api/artistdata?id=${id}`
  );
  return data;
};

export default function useArtistData(id: string) {
  return useQuery(["artist data", id], () => getArtistData(id));
}
