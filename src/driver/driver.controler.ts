import { Context } from "hono";
import { deleteDriver, fetchOneDriver, fetchingAllDriver, insertDriver, updateDriver } from "./driver.service";


export const listDrivers = async (c: Context) => {
  try {
    const data = await fetchingAllDriver();
    return c.json(data,200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneDriver = async (c: Context) => {
  try {
    const id = c.req.param("name");
    const data = await fetchOneDriver(Number(id));
    if(data==null) return c.json({"msg": "driver not found"});
    return c.json(data, 200);
  } catch (e) {
    return c.json({ "error": e }, 500);
  }
};

export const deleteOneDriver = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await fetchOneDriver(Number(id));
    if (user === undefined) return c.json({ msg: "driver not found" });
    const result = await deleteDriver(Number(id));
    return c.json({ "msg": result }, 200);
  } catch (e) {
    return c.json({ "error": e }, 500);
  }
};

export const createDriver = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = await insertDriver(data);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    return c.json({ "error": e }, 500);
  }
}

export const updateDriverData= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const driver_exit = await fetchOneDriver(Number(id))
    // console.log(user_exit)
    const driver = await c.req.json();
    if(driver_exit === undefined) return c.json({"msg":`driver ${id} not found`},404)
    const result = await updateDriver(Number(id), driver);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    return c.json({"msg": e}, 500);
  }
}
