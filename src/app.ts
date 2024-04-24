import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { PORT, urlMongoDBN } from "./config/ValidEnvironment";
import route from "./routes/authRoutes";

dotenv.config();
const app = express();
const port = PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(urlMongoDBN)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(route);

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
