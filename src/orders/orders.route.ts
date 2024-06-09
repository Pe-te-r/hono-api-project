import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./orders.controler";


export const ordersRoute = new Hono()

// getting all users
ordersRoute.get('/list',listAll)
// getting one user
ordersRoute.get("/get/:name",getOne)

// deleting a user
ordersRoute.delete("/delete/:id",deleteOneData)

// updating a user
ordersRoute.put("/update/:id",updateData)

// creating a new user
ordersRoute.post("/create",createData)
