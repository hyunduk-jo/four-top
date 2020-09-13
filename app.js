import express from "express";// const express = require('express')와 같음
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { localMiddleware } from "./middlewares";
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));  //npm install helmet
//app.use(helmet());
app.set("view engine", "pug");//npm install pug
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());    //npm install cookie-parser
app.use(bodyParser.json()); //npm install body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));     //npm install morgan
app.use(localMiddleware);


app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);   //use를 써야함 import 하여 가져옴
app.use(routes.videos, videoRouter);

export default app; //누군가 내 파일을 import할 때 app object를 주겠다는 의미