import { Hono } from "hono";
import { createAdress, deleteOneAddress, getOneAddress, listAddress, updateAddressData } from "./address.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";

export const addressRoute = new Hono()

// getting all addresss
addressRoute.get('/listAddresses',allRoleAuth,listAddress)
// getting one address
addressRoute.get("/getAddress/:name",getOneAddress)

// deleting a address
addressRoute.delete("/deleteAddress/:id",adminRoleAuth,deleteOneAddress)

// updating a address
addressRoute.put("/updateAddress/:id",adminRoleAuth,updateAddressData)

// creating a new address
addressRoute.post("/createAddress",adminRoleAuth,createAdress)
