import { Hono } from "hono";
import { createOrderMenu, deleteOrderMenu, getOneOrderMenu, listOrderMenu, updateOrderMenuData } from "./order_menu_item.controler";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";


export const order_menuRoute = new Hono()

// getting all order_menus
order_menuRoute.get('/list',allRoleAuth,listOrderMenu)
// getting one order_menu
order_menuRoute.get("/get/:name",allRoleAuth,getOneOrderMenu)

// deleting a order_menu
order_menuRoute.delete("/delete/:id",adminRoleAuth,deleteOrderMenu)

// updating a order_menu
order_menuRoute.put("/update/:id",adminRoleAuth,updateOrderMenuData)

// creating a new order_menu
order_menuRoute.post("/create",adminRoleAuth,createOrderMenu)
