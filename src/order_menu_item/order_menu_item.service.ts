import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { OrderMenuInsert, OrderMenuSelect, orderMenuItemTable } from "../drizzle/schema";

let message= "order menu"

export const fetchingAll = async(): Promise<OrderMenuSelect[] | null >=>{
    return await db.query.orderMenuItemTable.findMany()
}

export const fetchOne = async(id: number): Promise<OrderMenuSelect | undefined>=>{
    return await db.query.orderMenuItemTable.findFirst({
        where:eq(orderMenuItemTable.id,id)
    })
}

export const deleteOne = async(id: number)=>{
    await db.delete(orderMenuItemTable).where(eq(orderMenuItemTable.id,id))
    return  `${message} deleted`
}

export const insert = async (data: OrderMenuInsert) => {
    await db.insert(orderMenuItemTable).values(data)
    return `${message} created successfully`;
}
export const update = async (id: number, data: OrderMenuInsert) => {
    await db.update(orderMenuItemTable).set(data).where(eq(orderMenuItemTable.id, id))
    return `${message} updated successfully`;
}
