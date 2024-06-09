import { Context } from "hono";
import { deleteCategoryRecord, fetchOneCategoryRecord, fetchingAllCategory, insertCategoryTable, updateCategoryRecord } from "./category.service";

export const listCategory = async (c: Context) => {
  try {
    const users = await fetchingAllCategory();
    console.log(users);
    return c.json(users, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneCategory = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await fetchOneCategoryRecord(Number(id));
    if(user==null) return c.json({"msg": "category not found"});
    return c.json(user, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const deleteOneCategory = async (c: Context) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const user = await fetchOneCategoryRecord(Number(id));
    if (user === undefined) return c.json({ msg: "category not found" });
    const result =await deleteCategoryRecord(Number(id));

    return c.json({ msg: result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const createCategory = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = await insertCategoryTable(data);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // consol.log(error);
    return c.json({ "error": e }, 500);
  }
}

export const updateCategoryData = async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const user_exit = await fetchOneCategoryRecord(Number(id))
    if(user_exit === undefined) return c.json({"msg":id},404)
    const user = await c.req.json();
    const result = await updateCategoryRecord(Number(id), user);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    console.log(e);
    return c.json({"msg": "no data"}, 500);
  }
}