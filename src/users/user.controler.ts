import { Context } from "hono";
import { fetchingAllUsers, deleteUser,insertUser, fetchOneUser,loginService ,updateUser} from "./user.service";
import * as bcrypt from "bcrypt"
import {  sign} from "hono/jwt"
import "dotenv/config";
import { verifyToken } from "../middleAuth/middleAuth.users";
import { and } from "drizzle-orm";



export const login=async(c: Context)=>{
  try {
    const user =await c.req.json();

    const user_exit = await loginService(user)
    console.log(user_exit);
    if (user_exit===undefined || user_exit=== null) return c.json({"error":"does not exist"})
    const userMatch=await bcrypt.compare(user.password, user_exit.password as string)
    if(! userMatch ) return c.json({"error":"wrong password"})
    if(userMatch){
      // sign a token user
      const payload = {
        user_id:user_exit.id,
        role:user_exit.role,
        email:user_exit.email,
        exp:Math.floor(Date.now()/1000)+(60*180)
      }
      const secret=process.env.SECRET_KEY as string
      const token= await sign(payload, secret)

      return c.json({token,user:{...user_exit}},200)
    }
  } catch (error: any) {
    return c.json({ "error": error?.message }, 500);
  }
}



export const listUsers = async (c: Context) => {
  try {
    const limitParam = c.req.query('limit');
    const limit = limitParam ? parseInt(limitParam,10): undefined;
    const users = await fetchingAllUsers(limit? {limit}: undefined);
    if (users === null) return c.json({ msg: "no users found" });
    return c.json(users, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getOneUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const token = c.req.header("Authorization")
    const decoded=await verifyToken(token as string,process.env.SECRET_KEY as string)
    if(Number(decoded?.user_id) !== Number(id) || !decoded) return c.json({msg:"cannot get another user details"})
    const user = await fetchOneUser(Number(id));
    if(user==null) return c.json({"msg": "user not found"});
    return c.json(user, 200);
  } catch (error: any) {
    return c.json({ "error": error?.message}, 500);
  }
};

export const deleteOneUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const token = c.req.header("Authorization");
    const decoded= await verifyToken(token as string,process.env.SECRET_KEY as string);
    console.log(decoded?.user_id,id);

    if(Number(decoded?.user_id && decoded?.role !== "admin") !== Number(id) || !decoded) return c.json("cannot delete another user")

    const user = await fetchOneUser(Number(id));
    if (user === undefined) return c.json({ msg: "user not found" });
    const result = await deleteUser(Number(id));
    console.log(result)
    return c.json({ "msg": result }, 200);
  } catch (error: any) {
    return c.json({ "error": error?.message }, 500);
  }
};

export const logout=async(c: Context)=>{
  // implemen how to log out you have to delete the token and make it invalid unless you login in again suggest beter code

}

export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const password= user.password
    const hashed_password = await bcrypt.hash(password,10);
    user.password = hashed_password
    const result = await insertUser(user);
    return c.json({ msg: result}, 200);

  } catch (error: any) {

    return c.json({ "error": error?.message }, 500);
  }
}

export const updateUserData= async(c: Context)=>{
  try {
    const token = c.req.header("Authorization");
    const id = c.req.param("id");
    const decoded = await verifyToken(token!,process.env.SECRET_KEY!)
    if(decoded?.user_id === id ) return c.json({ "msg": "cannot update this details"})
    const user_exit = await fetchOneUser(Number(id))
    // console.log(user_exit)
    console.log(await c.req.json())
    const user = await c.req.json();
    if(user_exit === undefined) return c.json({"msg":`user ${id} not found`},404)
    console.log(user)
    const result = await updateUser(Number(id), user);
    return c.json({ msg: result }, 200);
  } catch (error: any) {
    return c.json({"msg": error?.message}, 500);
  }
}
