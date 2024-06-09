import { Hono } from "hono";
import { createOrderMenu, deleteOrderMenu, getOneOrderMenu, listOrderMenu, updateOrderMenuData } from "./order_menu_item.controler";


export const order_menuRoute = new Hono()

// getting all order_menus
order_menuRoute.get('/list',listOrderMenu)
// getting one order_menu
order_menuRoute.get("/get/:name",getOneOrderMenu)

// deleting a order_menu
order_menuRoute.delete("/delete/:id",deleteOrderMenu)

// updating a order_menu
order_menuRoute.put("/update/:id",updateOrderMenuData)

// creating a new order_menu
order_menuRoute.post("/create",createOrderMenu)
