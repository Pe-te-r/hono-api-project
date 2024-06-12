import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { StatusCatalogInsert, StatusCatalogSelect, statusCatalogTable } from "../drizzle/schema";

let message= "status catalog"

type FetchingAll = {
    limit?: number;
  };

export const fetchingAll = async(option?: FetchingAll): Promise<StatusCatalogSelect[] | null >=>{
    const limit =Number(option?.limit)
    if(limit>0){
        return await db.query.statusCatalogTable.findMany({limit:limit})
    }


    return await db.query.statusCatalogTable.findMany()
}

export const fetchOne = async(id: number): Promise<StatusCatalogSelect | undefined>=>{
    return await db.query.statusCatalogTable.findFirst({
        where:eq(statusCatalogTable.id,id)
    })
}

export const deleteOne = async(id: number)=>{
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id,id))
    return  `${message} deleted`
}

export const insert = async (user: StatusCatalogInsert) => {
    await db.insert(statusCatalogTable).values(user)
    return `${message} created successfully`;
}
export const update = async (id: number, user: StatusCatalogInsert) => {
    await db.update(statusCatalogTable).set(user).where(eq(statusCatalogTable.id, id))
    return `${message} updated successfully`;
}
