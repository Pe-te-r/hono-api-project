import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./order_status.controler";


export const OrderStatusRoute = new Hono()

// getting all users
OrderStatusRoute.get('/list',listAll)
// getting one user
OrderStatusRoute.get("/get/:name",getOne)

// deleting a user
OrderStatusRoute.delete("/delete/:id",deleteOneData)

// updating a user
OrderStatusRoute.put("/update/:id",updateData)

// creating a new user
OrderStatusRoute.post("/create",createData)
