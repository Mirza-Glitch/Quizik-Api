import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan"
import dotenv from "dotenv";
import connectDb from "./utils/connectDb";
import { quizRouter } from "./routes/quizRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.use("/api/", quizRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("server is up and running !!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDb(process.env.DB_URL);
  console.log(`Server running on port ${PORT}`);
});
