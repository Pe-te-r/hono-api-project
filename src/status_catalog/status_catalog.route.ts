import { Hono } from "hono";
import { createData, deleteOneData, getOne, listAll, updateData } from "./status_catalog.controler";


export const statusCatalogsRoute = new Hono()

// getting all status catalog
statusCatalogsRoute.get('/list',listAll)
// getting one user
statusCatalogsRoute.get("/get/:name",getOne)

// deleting a user
statusCatalogsRoute.delete("/delete/:id",deleteOneData)

// updating a user
statusCatalogsRoute.put("/update/:id",updateData)

// creating a new user
statusCatalogsRoute.post("/create",createData)
