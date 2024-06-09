import db from "../drizzle/db";

import { eq } from "drizzle-orm";
import { RestaurantInsert, RestaurantSelect, restaurantTable } from "../drizzle/schema";

export const fetchingAllRestaurants = async(): Promise< RestaurantSelect[] | any >=>{
    return await db.query.restaurantTable.findMany()
}

export const fetchOneRestaurantRecord = async(id: number): Promise<RestaurantInsert | undefined>=>{
    return await db.query.restaurantTable.findFirst({
        where:eq(restaurantTable.id,id)
    })
}

export const deleteRestaurantRecord = async(id: number)=>{
    await db.delete(restaurantTable).where(eq(restaurantTable.id,id))
    return  "retaurant deleted"
}

export const insertRestaurantTable = async (data: RestaurantInsert) => {
    await db.insert(restaurantTable).values(data)
    return "restaurant created successfully";
}
export const updateRestaurantTable = async (id: number, user: RestaurantInsert) => {
    await db.update(restaurantTable).set(user).where(eq(restaurantTable.id, id))
    return "restaurant updated successfully";
}
