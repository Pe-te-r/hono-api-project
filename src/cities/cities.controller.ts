import { Context } from "hono";
import { deleteCity, fetchOneCity, fetchingAllCity, insertCity, updateCity } from "./cities.services";
import { error } from "console";


export const listCities = async (c: Context) => {
  try {
    const states = await fetchingAllCity();
    console.log(states);
    return c.json(states, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneCity = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const state = await fetchOneCity(Number(id));
    if(state==null) return c.json({"msg": "city not found"});
    return c.json(state, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const deleteOneCity = async (c: Context) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const city = await fetchOneCity(Number(id));
    if (city === undefined) return c.json({ msg: "city not found" });
    const result =await deleteCity(Number(id));
    return c.json({ msg: result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const createCity = async (c: Context) => {
  try {
    const state = await c.req.json();
    const result = await insertCity(state);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
}

export const updateCityTable= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const state_exit = await fetchOneCity(Number(id))
    const state = await c.req.json(); 
    if(state_exit === undefined) return c.json({"msg":`id ${id} not found`},404)
    const result = await updateCity(Number(id), state);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    console.log(error);
    return c.json({error: "error occured"}, 500);
  }
}
