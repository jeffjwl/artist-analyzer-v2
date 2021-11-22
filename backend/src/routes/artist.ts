import { Router } from "express";
import * as spotifyApiController from "../models/utils";

export const router = Router();

router.get("/search/", async (req, res) => {
  const artistName = req.query.name as string;

  try {
    const searchResult = await spotifyApiController.searchArtists(artistName);
    return res.json({ searchResult });
  } catch (error) {
    return res.status(400);
  }
});

router.get("/artistdata/", async (req, res) => {
  const id = req.query.id as string;
  try {
    const artistData = await spotifyApiController.getArtistData(id);
    return res.json({ artistData });
  } catch (error) {
    return res.status(400);
  }
});

router.get("/artistfeatures/", async (req, res) => {
  const id = req.query.id as string;
  try {
    const artistData = await spotifyApiController.getAudioFeatures(id);
    return res.json({ artistData });
  } catch (error) {
    return res.status(400);
  }
});

router.get("/related-artists/", async (req, res) => {
  const id = req.query.id as string;
  try {
    const relatedArtists = await spotifyApiController.getRelatedArtists(id);
    return res.json({ relatedArtists });
  } catch (error) {
    return res.status(400);
  }
});

router.get("/dtrb/", async (req, res) => {
  const id = req.query.id as string;
  try {
    const artistTree = await spotifyApiController.startDTRB(id);

    return res.json({ artistTree });
  } catch (error) {
    return res.status(400);
  }
});
