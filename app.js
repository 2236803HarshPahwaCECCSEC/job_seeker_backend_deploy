import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from   "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import {errorMiddleware} from "./middlewares/error.js"
import {dbConnection} from './database/dbConnection.js'
dotenv.config({path:"./config/config.env"});
const app=express();


app.use(cors({
    origin: "https://job-seeking-web-application-hp.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  app.use("/api/v1/user",userRouter);
  app.use("/api/v1/application",applicationRouter);
  app.use("/api/v1/job",jobRouter);
  dbConnection();
  app.use(errorMiddleware);
export default app;