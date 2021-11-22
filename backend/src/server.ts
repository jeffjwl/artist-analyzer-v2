import * as dotenv from "dotenv";
import express from "express";
import logger from "./middleware/logger";
import { router } from "./routes/artist";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
