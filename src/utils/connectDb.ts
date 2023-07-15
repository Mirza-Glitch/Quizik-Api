import mongoose from "mongoose";

export default function connectDb(dbUrl: string): void {
  mongoose.connect(dbUrl)
    .then(() => {
      console.log(`Successfully connected to database`);
    })
    .catch((error) => {
      console.log("Error connecting to database: ", error);
    });
}
