import { Hono } from "hono";
import {deleteOneUser,createUser, getOneUser, listUsers, updateUserData,login } from "./user.controler";
import { userRoleAuth } from "../middleAuth/middleAuth.users";

export const userRoute = new Hono()

// getting all users
userRoute.get('/listUsers',userRoleAuth,listUsers)
// getting one user
userRoute.get("/getUser/:name",getOneUser)

// deleting a user
userRoute.delete("/deleteUser/:id",userRoleAuth,deleteOneUser)

// updating a user
userRoute.put("/updateUser/:id",updateUserData)

// creating a new user
userRoute.post("/createUser",createUser)


// login to the database
userRoute.post("/login",login)