import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./status_catalog.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";


export const statusCatalogsRoute = new Hono()

// getting all status catalog
statusCatalogsRoute.get('/list',allRoleAuth,listAll)
// getting one user
statusCatalogsRoute.get("/get/:name",allRoleAuth,getOne)

// deleting a user
statusCatalogsRoute.delete("/delete/:id",adminRoleAuth,deleteOneData)

// updating a user
statusCatalogsRoute.put("/update/:id",adminRoleAuth,updateData)

// creating a new user
statusCatalogsRoute.post("/create",adminRoleAuth,createData)
