import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import connectDB from "./config/dbConn.js";
import fetchAndStoreQuestions from "./api/fetchQuestions.js";
import questionRouter from "./routes/question.js"
import testHistoryRouter from "./routes/testHistory.js"

const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());
app.use(express.json());

connectDB();
// fetchAndStoreQuestions();

app.use('/questions', questionRouter);

app.use('/testHistory', testHistoryRouter);


const db = mongoose.connection;

db.once('open', () => {
    console.log("connect to db");
    app.listen(PORT, () => console.log(`app running on PORT ${PORT}`))
})