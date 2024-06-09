import { Hono } from "hono";
import {deleteOneUser,createUser, getOneUser, listUsers, updateUserData } from "./user.controler";

export const userRoute = new Hono()

// getting all users
userRoute.get('/listUsers',listUsers)
// getting one user
userRoute.get("/getUser/:name",getOneUser)

// deleting a user
userRoute.delete("/deleteUser/:id",deleteOneUser)

// updating a user
userRoute.put("/updateUser/:id",updateUserData)

// creating a new user
userRoute.post("/createUser",createUser)
