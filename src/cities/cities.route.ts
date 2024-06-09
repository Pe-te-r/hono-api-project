import { Hono } from "hono";
import { createCity, deleteOneCity, getOneCity, listCities, updateCityTable } from "./cities.controller";

export const cityRoute= new Hono()

// getting all users
cityRoute.get('/listCities',listCities)
// getting one user
cityRoute.get("/getCity/:id",getOneCity)

// deleting a user
cityRoute.delete("/deleteCity/:id",deleteOneCity)

// updating a user
cityRoute.put("/updateCity/:id",updateCityTable)

// creating a new user
cityRoute.post("/createCity",createCity)
