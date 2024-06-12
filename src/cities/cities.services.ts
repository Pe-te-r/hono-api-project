import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { CityInsert, cityTable } from "../drizzle/schema";

export const fetchingAllCity = async(): Promise<CityInsert[] | any >=>{
    return await db.query.cityTable.findMany({
        with:{
            addresses:true,
            state:true,
            restaurants:true
        }
    })
}

export const fetchOneCity = async(id: number): Promise<CityInsert | undefined>=>{
    return await db.query.cityTable.findFirst({
        where:eq(cityTable.id,id),
        with:{
            addresses:true,
            state:true,
            restaurants:true
        }
    })
}

export const deleteCity = async(id: number)=>{
    await db.delete(cityTable).where(eq(cityTable.id,id))
    return  "city deleted"
}

export const insertCity = async (user: CityInsert) => {
    await db.insert(cityTable).values(user)
    return "city created successfully";
}
export const updateCity = async (id: number, user: CityInsert) => {
    await db.update(cityTable).set(user).where(eq(cityTable.id, id))
    return "city updated successfully";
}
