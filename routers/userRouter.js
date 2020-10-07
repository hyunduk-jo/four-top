import express from "express";
import { onlyPrivate } from "../middlewares";
import routes from "../routes"
import {
  users, editProfile, changePassword, userDetail
} from "./controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
