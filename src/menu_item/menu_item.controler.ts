import { Context } from "hono";
import { deleteMenuItems, fetchOneMenuItems, fetchingAllMenuItems, insertMenuItems, updateMenuItems } from "./menu_item.service";


export const listMenuItems = async (c: Context) => {
  try {
    const data = await fetchingAllMenuItems();
    return c.json(data, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneMenuItem = async (c: Context) => {
  try {
    const id = c.req.param("name");
    const data = await fetchOneMenuItems(Number(id));
    if(data==null) return c.json({"msg": "menu item not found"});
    return c.json(data, 200);
  } catch (e) {
    return c.json({ "error": e }, 500);
  }
};

export const deleteOneMenuItem = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const data = await fetchOneMenuItems(Number(id));
    if (data === undefined) return c.json({ msg: "menu item not found" });
    const result = await deleteMenuItems(Number(id));
    return c.json({ "msg": result }, 200);
  } catch (e) {
    return c.json({ "error": e }, 500);
  }
};

export const createMenuItem = async (c: Context) => {
  try {
    const user = await c.req.json();
    const result = await insertMenuItems(user);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // console.log(error);
    return c.json({ "error": e }, 500);
  }
}

export const updateMenuItemData= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const menu_exit = await fetchOneMenuItems(Number(id))
    // console.log(user_exit)
    if(menu_exit === undefined) return c.json({"msg":`menu item ${id} not found`},404)
    const data = await c.req.json();
    const result = await updateMenuItems(Number(id), data);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    console.log(e);
    return c.json({"msg": e}, 500);
  }
}
