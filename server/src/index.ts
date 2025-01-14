import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { Server } from "socket.io";
import {createServer} from "http"
import cors from "cors";
import allRoutes from "./routes/index"
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();
app.use(cors())
const httpServer = createServer(app);
 
export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials:true
    }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
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
try{
  app.use("/api/v1",allRoutes)
}
catch(error:any){
  console.log(error)
}
app.use(errorHandler)
const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  connect();
  console.log(`app is listening on ${port}`);
});

process.on('SIGINT', () => {
  //@ts-ignore
  mongoose.connection.close(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
  });
});
