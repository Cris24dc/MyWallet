import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export default function connectToMongoDB() {
  mongoose.connect(URI).then(() => {
    console.log("Connected to MongoDB...");
  });
}
