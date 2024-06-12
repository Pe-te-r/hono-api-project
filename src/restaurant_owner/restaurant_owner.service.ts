import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {  RestaurantInsert, RestaurantOwnerSelect, restaurantOwnerTable } from "../drizzle/schema";

let message= "restaurants owner"

export const fetchingAll = async(): Promise<RestaurantOwnerSelect[] | null >=>{  
    return await db.query.restaurantOwnerTable.findMany({
        with:{
            owner:true,
            restaurant:true
        }
    })
}

export const fetchOne = async(id: number): Promise<RestaurantOwnerSelect | undefined>=>{
    return await db.query.restaurantOwnerTable.findFirst({
        where:eq(restaurantOwnerTable.id,id),
        with:{
            owner:true,
            restaurant:true
        }
    })
}

export const deleteOne = async(id: number)=>{
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id,id))
    return  `${message} deleted`
}

export const insert = async (data: any) => {
    await db.insert(restaurantOwnerTable).values(data)
    return `${message} created successfully`;
}
export const update = async (id: number, data: RestaurantInsert) => {
    await db.update(restaurantOwnerTable).set(data).where(eq(restaurantOwnerTable.id, id))
    return `${message} updated successfully`;
}
