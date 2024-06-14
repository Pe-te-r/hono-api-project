import { Hono } from "hono";
import { createMenuItem, deleteOneMenuItem, getOneMenuItem, listMenuItems, updateMenuItemData } from "./menu_item.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";

export const menu_itemRoute = new Hono()

// getting all menu_items
menu_itemRoute.get('/listMenuItems',allRoleAuth,listMenuItems)
// getting one menu_item
menu_itemRoute.get("/getMenu/:name",allRoleAuth,getOneMenuItem)

// deleting a menu_item
menu_itemRoute.delete("/deleteMenu/:id",adminRoleAuth,deleteOneMenuItem)

// updating a menu_item
menu_itemRoute.put("/updateMenu/:id",adminRoleAuth,updateMenuItemData)

// creating a new menu_item
menu_itemRoute.post("/createMenu",adminRoleAuth,createMenuItem)
