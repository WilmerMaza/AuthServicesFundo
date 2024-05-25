import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { PORT, urlMongoDBN } from "./config/ValidEnvironment";
import route from "./routes/authRoutes";

dotenv.config();
const app = express();
const port = PORT;
const allowedOrigins = ["http://tu-api-gateway.com", "*"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin!)) {
      callback(null, true);
    } else if (allowedOrigins.includes("*")) {
      // Permitir todas las solicitudes si el origen es '*'
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(urlMongoDBN)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(route);

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
