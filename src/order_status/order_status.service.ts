import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { OrderStatusInsert, OrderStatusSelect, ordersStatusTable } from "../drizzle/schema";

let message= "order status"

export const fetchingAll = async(): Promise<OrderStatusSelect[] | null >=>{
    return await db.query.ordersStatusTable.findMany()
}

export const fetchOne = async(id: number): Promise<OrderStatusSelect | undefined>=>{
    return await db.query.ordersStatusTable.findFirst({
        where:eq(ordersStatusTable.id,id)
    })
}

export const deleteOne = async(id: number)=>{
    await db.delete(ordersStatusTable).where(eq(ordersStatusTable.id,id))
    return  `${message} deleted`
}

export const insert = async (data: OrderStatusInsert) => {
    await db.insert(ordersStatusTable).values(data)
    return `${message} created successfully`;
}
export const update = async (id: number, data: OrderStatusInsert) => {
    await db.update(ordersStatusTable).set(data).where(eq(ordersStatusTable.id, id))
    return `${message} updated successfully`;
}
