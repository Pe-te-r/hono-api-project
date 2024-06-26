import { Context } from "hono";
import { deleteOne, fetchOne, fetchingAll, insert, update } from "./status_catalog.service";



export const listAll= async (c: Context) => {
  try {
    const limitParam = c.req.query('limit');
    const limit = limitParam ? parseInt(limitParam,10): undefined;
    const data= await fetchingAll(limit? {limit}: undefined);
    return c.json(data, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getOne = async (c: Context) => {
  try {
    const id = c.req.param("name");
    const data = await fetchOne(Number(id));
    if(data==null) return c.json({"msg": "status catalog not found"});
    return c.json(data, 200);
  } catch (e) {
    return c.json({ "error": e }, 500);
  }
};

export const deleteOneData = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const data= await fetchOne(Number(id));
    if (data === undefined) return c.json({ msg: "status catalog not found" });
    const result = await deleteOne(Number(id));
    return c.json({ "msg": result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const createData = async (c: Context) => {
  try {
    const  data= await c.req.json();
    const result = await insert(data);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // console.log(error);
    return c.json({ "error": e }, 500);
  }
}

export const updateData= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const data_exit = await fetchOne(Number(id))
    // console.log(user_exit)
    const data = await c.req.json();
    if(data_exit === undefined) return c.json({"msg":`status catalog ${id} not found`},404)
    const result = await update(Number(id), data);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    console.log(e);
    return c.json({"msg": e}, 500);
  }
}
