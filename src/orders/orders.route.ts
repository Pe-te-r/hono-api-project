import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./orders.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";


export const ordersRoute = new Hono()

// getting all users
ordersRoute.get('/list',adminRoleAuth,listAll)
// getting one user
ordersRoute.get("/get/:name",allRoleAuth,getOne)

// deleting a user
ordersRoute.delete("/delete/:id",deleteOneData)

// updating a user
ordersRoute.put("/update/:id",updateData)

// creating a new user
ordersRoute.post("/create",createData)
