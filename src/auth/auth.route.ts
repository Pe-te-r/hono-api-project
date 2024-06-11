import { Hono } from "hono";
import { loginUser, registerUser } from "./auth.controller";

export const authRouter=new Hono()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)