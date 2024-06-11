import { Context } from "hono"

export const registerUser = (c: Context) =>{
    return c.json({ message: "register user" }, 200)
}
export const loginUser = (c: Context) =>{
    return c.json({ message: "login user" }, 200)
}