import db from "../drizzle/db";

import { eq } from "drizzle-orm";
import { CategoryInsert, CategorySelect, categoryTable } from "../drizzle/schema";

export const fetchingAllCategory = async(): Promise< CategorySelect[] | any >=>{
    return await db.query.categoryTable.findMany({
        with:{
            menuItems:{columns:{name:true,description:true,ingredients:true}}
        }
    })
}

export const fetchOneCategoryRecord = async(id: number): Promise<CategorySelect | undefined>=>{
    return await db.query.categoryTable.findFirst({
        where:eq(categoryTable.id,id),
        with:{
            menuItems:{columns:{name:true,description:true,ingredients:true}}
        }
    })
}

export const deleteCategoryRecord = async(id: number)=>{
    await db.delete(categoryTable).where(eq(categoryTable.id,id))
    return  "category deleted"
}

export const insertCategoryTable = async (data: CategoryInsert) => {
    await db.insert(categoryTable).values(data)
    return "category created successfully";
}
export const updateCategoryRecord = async (id: number, newUpdate: CategoryInsert) => {
    await db.update(categoryTable).set(newUpdate).where(eq(categoryTable.id, id))
    return "category updated successfully";
}
