import db from "../drizzle/db";
import { eq, sql } from "drizzle-orm";
import { UserSelect, userInsert, usersTable } from "../drizzle/schema";

export const fetchingAllUsers = async(): Promise<UserSelect[] | null >=>{
    try{
        console.log('Fetching all users')
        return await db.query.usersTable.findMany()
    }catch(error: any){
        return error?.message
    }

}

export const fetchOneUser = async(id: number): Promise<UserSelect | undefined>=>{
    return await db.query.usersTable.findFirst({
        where:eq(usersTable.id,id)
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