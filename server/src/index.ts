import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import dotenv from "dotenv";



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const connect = () => {
  const MONGOURL=process.env.MONGO_DATABASE;

  if (!MONGOURL) {
    throw new Error('MongoDB URI is not provided.');
  }
  mongoose
    .connect(MONGOURL)
    .then(() => console.log("connected to db"))
    .then(()=>{
      app.use(express.json());
    })
    .catch((err) => {
      throw err;
    });
};
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  connect();
  console.log(`app is listening on ${port}`);
});