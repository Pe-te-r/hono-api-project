import { Context } from "hono";
import { fetchingAllUsers, deleteUser,insertUser, fetchOneUser ,updateUser} from "./user.service";
import { error } from "console";


export const listUsers = async (c: Context) => {
  try {
    const users = await fetchingAllUsers();
    console.log(users);
    return c.json(users, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneUser = async (c: Context) => {
  try {
    const id = c.req.param("name");
    const user = await fetchOneUser(Number(id));
    if(user==null) return c.json({"msg": "user not found"});
    return c.json(user, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const deleteOneUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const user = await fetchOneUser(Number(id));
    if (user === undefined) return c.json({ msg: "user not found" });
    const result = await deleteUser(Number(id));
    console.log(result)
    return c.json({ "msg": result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const result = await insertUser(user);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // console.log(error);
    return c.json({ "error": error }, 500);
  }
}

export const updateUserData= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const user_exit = await fetchOneUser(Number(id))
    // console.log(user_exit)
    console.log(await c.req.json())
    const user = await c.req.json();
    if(user_exit === undefined) return c.json({"msg":`user ${id} not found`},404)
    console.log(user)
    const result = await updateUser(Number(id), user);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    console.log(e);
    return c.json({"msg": e}, 500);
  }
}
