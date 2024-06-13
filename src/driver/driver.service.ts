import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { DriverInsert, DriverSelect, driversTable } from "../drizzle/schema";

export const fetchingAllDriver = async(): Promise<DriverInsert[] | null >=>{
    return await db.query.driversTable.findMany({
        with:{
            orders:{columns:{delivery_address_id:true,actual_delivery_time:true}},
            user:true
        }
    })
}

export const fetchOneDriver = async(id: number): Promise<DriverSelect | undefined>=>{
    return await db.query.driversTable.findFirst({
        where:eq(driversTable.id,id),
            with:{
                orders:{columns:{delivery_address_id:true,actual_delivery_time:true}},
                user:true
            }
    })
}

export const deleteDriver = async(id: number)=>{
    await db.delete(driversTable).where(eq(driversTable.id,id))
    return  "driver deleted"
}

export const insertDriver = async (data: DriverInsert) => {
    await db.insert(driversTable).values(data)
    return "driver created successfully";
}
export const updateDriver = async (id: number, data: DriverInsert) => {
    await db.update(driversTable).set(data).where(eq(driversTable.id, id))
    return "driver updated successfully";
}
