import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const client = new MongoClient(uri);
const db = client.db("NextMart");

client.connect()
  .then(() => {
    console.log("Database connected successfully to NextMart");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export { app, db };