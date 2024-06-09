import { Hono } from "hono";
import { createDriver, deleteOneDriver, getOneDriver, listDrivers, updateDriverData } from "./driver.controler";

export const driverRoute = new Hono()

// getting all users
driverRoute.get('/listDrivers',listDrivers)
// getting one user
driverRoute.get("/getDriver/:name",getOneDriver)

// deleting a user
driverRoute.delete("/deleteDriver/:id",deleteOneDriver)

// updating a user
driverRoute.put("/updateDriver/:id",updateDriverData)

// creating a new user
driverRoute.post("/createDriver",createDriver)
