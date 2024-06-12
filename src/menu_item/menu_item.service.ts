import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { MenuItemInsert, MenuItemSelect, menuItemsTable } from "../drizzle/schema";

export const fetchingAllMenuItems = async(): Promise<MenuItemSelect[] | null >=>{
    return await db.query.menuItemsTable.findMany({
        with:{
            category:true,
            orderMenuItems:true,
            restaurant:true
        }
    })
}

export const fetchOneMenuItems = async(id: number): Promise<MenuItemSelect | undefined>=>{
    return await db.query.menuItemsTable.findFirst({
        where:eq(menuItemsTable.id,id),
            with:{
                category:true,
                orderMenuItems:true,
                restaurant:true
            }
    })
}

export const deleteMenuItems = async(id: number)=>{
    await db.delete(menuItemsTable).where(eq(menuItemsTable.id,id))
    return  "menu deleted"
}

export const insertMenuItems = async (data: MenuItemInsert) => {
    await db.insert(menuItemsTable).values(data)
    return "menu_item created successfully";
}
export const updateMenuItems = async (id: number, data: MenuItemInsert) => {
    await db.update(menuItemsTable).set(data).where(eq(menuItemsTable.id, id))
    return "menu_item updated successfully";
}
