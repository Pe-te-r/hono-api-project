import { Hono } from "hono";
import { createMenuItem, deleteOneMenuItem, getOneMenuItem, listMenuItems, updateMenuItemData } from "./menu_item.controler";

export const menu_itemRoute = new Hono()

// getting all menu_items
menu_itemRoute.get('/listMenuItems',listMenuItems)
// getting one menu_item
menu_itemRoute.get("/getMenu/:name",getOneMenuItem)

// deleting a menu_item
menu_itemRoute.delete("/deleteMenu/:id",deleteOneMenuItem)

// updating a menu_item
menu_itemRoute.put("/updateMenu/:id",updateMenuItemData)

// creating a new menu_item
menu_itemRoute.post("/createMenu",createMenuItem)
