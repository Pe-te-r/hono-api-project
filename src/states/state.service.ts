import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { StateInsert, StateSelect, stateTable } from "../drizzle/schema"

type FetchingAll = {
    limit?: number;
  };

export const getStates = async(option?: FetchingAll) : Promise<StateSelect[] | null>=>{
    const limit=Number(option?.limit)
    if(limit>0){
        return await db.query.stateTable.findMany({
            limit: limit,
            with:{
                cities:true
            }
        })
    }
    return await db.query.stateTable.findMany({
        with:{
            cities:true
        }
    })
}

export const getState = async(id: number): Promise<StateSelect | undefined>=>{
    return await db.query.stateTable.findFirst(
        {
            where: eq(stateTable.id,id),
            with:{
                cities:true,
            }

        }
    )    
}

export const deleteState = async(id: number)=>{
    await db.delete(stateTable).where(eq(stateTable.id,id))
    return "state deleted"
}
export const updateStateData = async (id: number, state: StateInsert) => {
    await db.update(stateTable).set(state).where(eq(stateTable.id, id))
    return "state updated successfully";
}

export const createStateData = async (state: StateInsert) => {
    await db.insert(stateTable).values(state)
    return "state created successfully";
}