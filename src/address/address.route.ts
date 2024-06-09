import { Hono } from "hono";
import { createAdress, deleteOneAddress, getOneAddress, listAddress, updateAddressData } from "./address.controler";

export const addressRoute = new Hono()

// getting all addresss
addressRoute.get('/listAddresses',listAddress)
// getting one address
addressRoute.get("/getAddress/:name",getOneAddress)

// deleting a address
addressRoute.delete("/deleteAddress/:id",deleteOneAddress)

// updating a address
addressRoute.put("/updateAddress/:id",updateAddressData)

// creating a new address
addressRoute.post("/createAddress",createAdress)
