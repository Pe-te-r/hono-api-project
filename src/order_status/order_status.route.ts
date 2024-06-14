import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./order_status.controler";
import { adminRoleAuth,  allRoleAuth, userRoleAuth } from "../middleAuth/middleAuth.users";


export const OrderStatusRoute = new Hono()

// getting all users
OrderStatusRoute.get('/list',adminRoleAuth,listAll)
// getting one user
OrderStatusRoute.get("/get/:name",allRoleAuth,getOne)

// deleting a user
OrderStatusRoute.delete("/delete/:id",allRoleAuth,deleteOneData)

// updating a user
OrderStatusRoute.put("/update/:id",userRoleAuth,updateData)

// creating a new user
OrderStatusRoute.post("/create",userRoleAuth,createData)
