import { Hono } from "hono";
import { createRestaurant, deleteOneRestaurant, getOneRestaurant, listRestaurants, updateRestaurantData } from "./restaurant.controller";
import { adminRoleAuth, allMiddleware } from "../middleAuth/middleAuth.users";

export const RouteRestaurant= new Hono()

// getting all users
RouteRestaurant.get('/listRestaurants',allMiddleware,listRestaurants)
// getting one user
RouteRestaurant.get("/getRestaurant/:id",allMiddleware,getOneRestaurant)

// deleting a user
RouteRestaurant.delete("/deleteRestaurant/:id",adminRoleAuth,deleteOneRestaurant)

// updating a user
RouteRestaurant.put("/updateRestaurant/:id",adminRoleAuth,updateRestaurantData)

// creating a new user
RouteRestaurant.post("/createRestaurant",adminRoleAuth,createRestaurant)
