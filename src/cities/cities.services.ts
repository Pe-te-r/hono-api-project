import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { CityInsert, cityTable } from "../drizzle/schema";

export const fetchingAllCity = async(): Promise<CityInsert[] | any >=>{
    return await db.query.cityTable.findMany({
        with:{
            addresses:{columns:{street_address_1:true,street_address_2:true}},
            state:{columns:{name:true}},
            restaurants:{columns:{name:true,street_address:true}}
        }
    })
}

export const fetchOneCity = async(id: number): Promise<CityInsert | undefined>=>{
    return await db.query.cityTable.findFirst({
        where:eq(cityTable.id,id),
        with:{
            addresses:{columns:{street_address_1:true,street_address_2:true}},
            state:{columns:{name:true}},
            restaurants:{columns:{name:true,street_address:true}}
        }
    })
}

export const deleteCity = async(id: number): Promise<string>=>{
    await db.delete(cityTable).where(eq(cityTable.id,id))
    return  "city deleted"
}

export const insertCity = async (user: CityInsert): Promise<string> => {
    await db.insert(cityTable).values(user)
    return "city created successfully";
}
export const updateCity = async (id: number, user: CityInsert): Promise<string> => {
    await db.update(cityTable).set(user).where(eq(cityTable.id, id))
    return "city updated successfully";
}
