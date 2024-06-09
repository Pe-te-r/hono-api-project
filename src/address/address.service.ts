import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { AddressInsert, AddressSelect, addressTable } from "../drizzle/schema";

export const fetchingAllAddress = async(): Promise<AddressSelect[] | null >=>{
    return await db.query.addressTable.findMany()
}

export const fetchOneAddress = async(id: number): Promise<AddressSelect | undefined>=>{
    return await db.query.addressTable.findFirst({
        where:eq(addressTable.id,id)
    })
}

export const deleteAddress = async(id: number)=>{
    await db.delete(addressTable).where(eq(addressTable.id,id))
    return  "address deleted"
}

export const insertAddress = async (address: AddressInsert) => {
    await db.insert(addressTable).values(address)
    return "address created successfully";
}
export const updateAddress = async (id: number, data: AddressInsert) => {
    await db.update(addressTable).set(data).where(eq(addressTable.id, id))
    return "address updated successfully";
}
