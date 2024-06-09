import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./restaurant_owner.controler";


export const restaurantOwnersRoute = new Hono()

// getting all owners
restaurantOwnersRoute.get('/list',listAll)
// getting one owner
restaurantOwnersRoute.get("/get/:name",getOne)

// deleting a owner
restaurantOwnersRoute.delete("/delete/:id",deleteOneData)

// updating a owner
restaurantOwnersRoute.put("/update/:id",updateData)

// creating a new owner
restaurantOwnersRoute.post("/create",createData)
