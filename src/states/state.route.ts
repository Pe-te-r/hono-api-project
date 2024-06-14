import { Hono } from "hono";
import { createState, deleteOneState, getAllStates, getOneState, updateState } from "./state.controller";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";

export const stateRoute=new Hono()

// get all states
stateRoute.get("/listStates",allRoleAuth,getAllStates)

// get one state
stateRoute.get("/oneState/:id",allRoleAuth,getOneState)

// delete one state
stateRoute.delete("/deleteState/:id",adminRoleAuth,deleteOneState)

// update state
stateRoute.put("/updateState/:id",adminRoleAuth,updateState)

// create state
stateRoute.post("/createState",adminRoleAuth,createState)