import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//middeleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
//option 1: Allow all origins with default of cors(*)
app.use(cors())

//option 2 : Allow custom origin
// app.use(cors({
//   origin:'http://localhost:3000',
//   method:['GET','POST','PUT', 'DELETE'],
//   allowedHeaders:['Content-Type'],
// }))

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN STACK Tutorial");
});

app.use('/books',booksRoute)
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port :${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
