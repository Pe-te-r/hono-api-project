import { Hono } from "hono";
import { createRestaurant, deleteOneRestaurant, getOneRestaurant, listRestaurants, updateRestaurantData } from "./restaurant.controller";
import { adminRoleAuth, allMiddleware, allRoleAuth } from "../middleAuth/middleAuth.users";

export const RouteRestaurant= new Hono()

// getting all users
RouteRestaurant.get('/listRestaurants',allRoleAuth,listRestaurants)
// getting one user
RouteRestaurant.get("/getRestaurant/:id",allRoleAuth,getOneRestaurant)

// deleting a user
RouteRestaurant.delete("/deleteRestaurant/:id",adminRoleAuth,deleteOneRestaurant)

// updating a user
RouteRestaurant.put("/updateRestaurant/:id",adminRoleAuth,updateRestaurantData)

// creating a new user
RouteRestaurant.post("/createRestaurant",adminRoleAuth,createRestaurant)
