import { Hono } from "hono";
import {deleteOneUser,createUser, getOneUser, listUsers, updateUserData,login } from "./user.controler";
import { userRoleAuth } from "../middleAuth/middleAuth.users";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../zvalidators";

export const userRoute = new Hono()

// getting all users
userRoute.get('/users',listUsers)
// getting one user
userRoute.get("/users/:id",getOneUser)

// deleting a user
userRoute.delete("/users/:id",userRoleAuth,deleteOneUser)

// updating a user
userRoute.put("/users/:id",updateUserData)

// creating a new user
userRoute.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}),createUser)


// login to the database
userRoute.post("/login",login)