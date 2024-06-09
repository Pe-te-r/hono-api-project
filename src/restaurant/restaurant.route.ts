import { Hono } from "hono";
import { createRestaurant, deleteOneRestaurant, getOneRestaurant, listRestaurants, updateRestaurantData } from "./restaurant.controller";

export const RouteRestaurant= new Hono()

// getting all users
RouteRestaurant.get('/listRestaurants',listRestaurants)
// getting one user
RouteRestaurant.get("/getRestaurant/:id",getOneRestaurant)

// deleting a user
RouteRestaurant.delete("/deleteRestaurant/:id",deleteOneRestaurant)

// updating a user
RouteRestaurant.put("/updateRestaurant/:id",updateRestaurantData)

// creating a new user
RouteRestaurant.post("/createRestaurant",createRestaurant)
