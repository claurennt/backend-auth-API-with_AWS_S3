import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI_USERSDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log("Error on initial connection:", e));

const dbClient = mongoose.connection;

dbClient.on("error", () => console.log("error"));

dbClient.on("disconnected", () => console.log("Disconnected from DB"));

export default dbClient;
