import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./restaurant_owner.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";


export const restaurantOwnersRoute = new Hono()

// getting all owners
restaurantOwnersRoute.get('/list',allRoleAuth,listAll)
// getting one owner
restaurantOwnersRoute.get("/get/:name",allRoleAuth,getOne)

// deleting a owner
restaurantOwnersRoute.delete("/delete/:id",adminRoleAuth,deleteOneData)

// updating a owner
restaurantOwnersRoute.put("/update/:id",adminRoleAuth,updateData)

// creating a new owner
restaurantOwnersRoute.post("/create",adminRoleAuth,adminRoleAuth,createData)
