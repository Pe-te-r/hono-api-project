import { Hono } from "hono";
import { createState, deleteOneState, getAllStates, getOneState, updateState } from "./state.controller";

export const stateRoute=new Hono()

// get all states
stateRoute.get("/listStates",getAllStates)

// get one state
stateRoute.get("/oneState/:id",getOneState)

// delete one state
stateRoute.delete("/deleteState/:id",deleteOneState)

// update state
stateRoute.put("/updateState/:id",updateState)

// create state
stateRoute.post("/createState",createState)