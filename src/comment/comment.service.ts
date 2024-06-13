import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { CommentInsert, CommentSelect, commentsTable } from "../drizzle/schema";

export const fetchingAllComment = async(): Promise<CommentSelect[] | null >=>{
    return await db.query.commentsTable.findMany({
            with:{
                order:true,
                user:{
                    columns:{email:true,name:true}
                }
            }
    })
}

export const fetchOneComment = async(id: number): Promise<CommentSelect | undefined>=>{
    return await db.query.commentsTable.findFirst({
        where:eq(commentsTable.id,id),
        with:{
            order:true,
            user:true
        }
    })
}

export const deleteComment = async(id: number)=>{
    await db.delete(commentsTable).where(eq(commentsTable.id,id))
    return  "comment deleted"
}

export const insertComment = async (comment: CommentInsert) => {
    await db.insert(commentsTable).values(comment)
    return "comment created successfully";
}
export const updateComment = async (id: number, user: CommentInsert) => {
    await db.update(commentsTable).set(user).where(eq(commentsTable.id, id))
    return "comment updated successfully";
}