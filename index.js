import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToMongoDB from "./start/db.js";
import routes from "./start/routes.js";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();

connectToMongoDB();

routes(app);

app.use(cors());
app.use(express.json());

app.use(express.static("static"));
app.use(
  "/pages",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/pages")
  )
);
app.use(
  "/css",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/css")
  )
);
app.use(
  "/images",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/images")
  )
);
app.use(
  "/scripts",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/scripts")
  )
);

app.listen(PORT, () => console.log("api running..."));

app.get("/", (req, res) => res.json("here is the get route"));
