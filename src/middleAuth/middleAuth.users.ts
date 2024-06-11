import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import "dotenv/config"

export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return null
    }
}

export const authMiddleware=async(c: Context,next: Next)=>{
    const token= c.req.header("Authorization");
    if(!token) return c.json({"error":"unauthorized no token provided"},401)
    const decoded=  await verifyToken(token,process.env.SECRET_KEY as string)
    if(!decoded) return c.json({"error":"token not valid"})
    // console.log(decoded.user_id)

    
    return next()
    
}
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next)