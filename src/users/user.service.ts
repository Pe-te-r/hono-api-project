import db from "../drizzle/db";
import { eq, sql } from "drizzle-orm";
import { UserSelect, userInsert, usersTable } from "../drizzle/schema";

// type FetchingAllUsersOptions = {
//     limit?: number;
//   };
interface FetchingAllUsersParams {
    limit?: number;
    detailed?: boolean;
  }
  

export const fetchingAllUsers = async(option?: FetchingAllUsersParams): Promise<UserSelect[] | null >=>{
    try{
        const detailed = Boolean(option?.detailed)
        const limit = Number(option?.limit)
        console.log(detailed)

        if(!detailed){
            if(limit>0){
                return await db.query.usersTable.findMany({limit: limit})
            }else{
                return await db.query.usersTable.findMany()
            }

        }else{
            if(limit>0){
                return await db.query.usersTable.findMany({
                    limit: limit,
                    with:{
                        addresses:true,
                        orders:true,
                        restaurantOwners:true,
                        comments:true,
                        drivers:true
                    }
                })
            }else{
                return await db.query.usersTable.findMany({
                    with:{
                        addresses:true,
                        orders:true,
                        restaurantOwners:true,
                        comments:true,
                        drivers:true
                    }
                })
            }
        }
    }catch(error: any){
        return error?.message
    }

}

export const fetchOneUser = async(id: number,option?: FetchingAllUsersParams): Promise<UserSelect | undefined>=>{
    const detailed = Boolean(option?.detailed)
    if(!detailed) return await db.query.usersTable.findFirst()
    return await db.query.usersTable.findFirst({
        where:eq(usersTable.id,id),
        with:{
            restaurantOwners:true,
            orders:true,
            comments:true,
            drivers:true,
            addresses:true
        }
    })
}

export const deleteUser = async(id: number)=>{
    await db.delete(usersTable).where(eq(usersTable.id,id))
    return  "user deleted"
}

export const insertUser = async (user: userInsert) => {
    try {
        await db.insert(usersTable).values(user)
        return "User created successfully";
    } catch (error: any) {
        return error?.message        
    }
}
export const updateUser = async (id: number, user: userInsert) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    return "User updated successfully";
}
export const loginService = async (user: any) => {
    try {
        
        return await db.query.usersTable.findFirst({
            columns: {
                name: true,
                email: true,
                role: true,
                password: true,
                id: true
            },
            where: sql`${usersTable.email} = ${user.email}`
        });

        // console.log('Query Result:', result);
        // return result;
    } catch (error: any) {
        console.error('Database query error:', error?.message);
    }
}