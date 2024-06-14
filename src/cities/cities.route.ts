import { Hono } from "hono";
import { createCity, deleteOneCity, getOneCity, listCities, updateCityTable } from "./cities.controller";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";

export const cityRoute= new Hono()

// getting all users
cityRoute.get('/listCities',allRoleAuth,listCities)
// getting one user
cityRoute.get("/getCity/:id",allRoleAuth,getOneCity)

// deleting a user
cityRoute.delete("/deleteCity/:id",adminRoleAuth,deleteOneCity)

// updating a user
cityRoute.put("/updateCity/:id",adminRoleAuth,updateCityTable)

// creating a new user
cityRoute.post("/createCity",adminRoleAuth,createCity)
