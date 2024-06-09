import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { OrderInsert, OrderSelect, ordersTable } from "../drizzle/schema";

let message= "order status"

export const fetchingAll = async(): Promise<OrderSelect[] | null >=>{  
    return await db.query.ordersTable.findMany()
}

export const fetchOne = async(id: number): Promise<OrderSelect | undefined>=>{
    return await db.query.ordersTable.findFirst({
        where:eq(ordersTable.id,id)
    })
}

export const deleteOne = async(id: number)=>{
    await db.delete(ordersTable).where(eq(ordersTable.id,id))
    return  `${message} deleted`
}

export const insert = async (data: OrderInsert) => {
    await db.insert(ordersTable).values(data)
    return `${message} created successfully`;
}
export const update = async (id: number, data: OrderInsert) => {
    await db.update(ordersTable).set(data).where(eq(ordersTable.id, id))
    return `${message} updated successfully`;
}
