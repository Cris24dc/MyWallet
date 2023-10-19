import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const database = client.db("MyWallet");
const PORT = process.env.PORT;

client.connect();
console.log("database running...");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("api running..."));

app.get("/", (req, res) => res.json("here is the get route"));
