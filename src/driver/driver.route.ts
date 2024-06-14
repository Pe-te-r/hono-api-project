import { Hono } from "hono";
import { createDriver, deleteOneDriver, getOneDriver, listDrivers, updateDriverData } from "./driver.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";

export const driverRoute = new Hono()

// getting all users
driverRoute.get('/listDrivers',adminRoleAuth,listDrivers)
// getting one user

driverRoute.get("/getDriver/:name",allRoleAuth,getOneDriver)
// deleting a user
driverRoute.delete("/deleteDriver/:id",adminRoleAuth,deleteOneDriver)

// updating a user
driverRoute.put("/updateDriver/:id",adminRoleAuth,updateDriverData)

// creating a new user
driverRoute.post("/createDriver",adminRoleAuth,createDriver)
