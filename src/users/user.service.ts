import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { UserSelect, userInsert, usersTable } from "../drizzle/schema";

export const fetchingAllUsers = async(): Promise<UserSelect[] | null >=>{
    return await db.query.usersTable.findMany()
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
    await db.insert(usersTable).values(user)
    return "User created successfully";
}
export const updateUser = async (id: number, user: userInsert) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    return "User updated successfully";
}
