import { Context } from "hono";
import { deleteRestaurantRecord, fetchOneRestaurantRecord, fetchingAllRestaurants, insertRestaurantTable, updateRestaurantTable } from "./restaurant.service";


export const listRestaurants = async (c: Context) => {
  try {
    const users = await fetchingAllRestaurants();
    console.log(users);
    return c.json(users, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneRestaurant = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await fetchOneRestaurantRecord(Number(id));
    if(user==null) return c.json({"msg": "resturant not found"});
    return c.json(user, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const deleteOneRestaurant = async (c: Context) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const user = await fetchOneRestaurantRecord(Number(id));
    if (user === undefined) return c.json({ msg: "restaurant not found" });
    const result =await deleteRestaurantRecord(Number(id));

    return c.json({ msg: result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const createRestaurant = async (c: Context) => {
  try {
    const user = await c.req.json();
    const result = await insertRestaurantTable(user);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // console.log(error);
    return c.json({ "error": e }, 500);
  }
}

export const updateRestaurantData = async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const user_exit = await fetchOneRestaurantRecord(Number(id))
    const user = await c.req.json();
    if(user_exit === undefined) return c.json({"msg":id},404)
    const result = await updateRestaurantTable(Number(id), user);
    return c.json({ msg: result }, 200);
  } catch (error: any) {
    return c.json({"msg": error}, 500);
  }
}
