import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { ArtistData } from "../models/types";

interface propTypes {
  chosenArtists: ArtistData[];
}

const reverseFeatureMap: any = {
  danceability: 0,
  energy: 1,
  mode: 2,
  speechiness: 3,
  acousticness: 4,
  liveness: 5,
  valence: 6
};

const initData: any = [
  {
    name: "danceability",
  },
  {
    name: "energy",
  },
  {
    name: "mode",
  },
  {
    name: "speechiness",
  },
  {
    name: "acousticness",
  },
  {
    name: "liveness",
  },
  {
    name: "valence",
  }
];

const Chart = ({ chosenArtists }: propTypes) => {
  const [formattedData, setFormattedData] = useState(initData);
  useEffect(() => {
    let toBeFormatted = formattedData;
    const newArtist: any =
      chosenArtists.length > 0
        ? chosenArtists[chosenArtists.length - 1]
        : false;
    if (newArtist) {
      for (const key of Object.keys(reverseFeatureMap)) {
        toBeFormatted[reverseFeatureMap[key]][newArtist.name] =
          newArtist.featuresMedian[key];
      }
    }
    setFormattedData(toBeFormatted);
  }, [chosenArtists, formattedData]);
  return (
    <ResponsiveContainer width={"100%"} height={600} key={`rc_${formattedData.length}`}>
      <BarChart data={formattedData} key={`bc_${formattedData.length}`}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {chosenArtists.map((artist) => (
          <Bar key={artist.id} dataKey={artist.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
