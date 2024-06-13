import { eq } from "drizzle-orm"
import db from "../drizzle/db"
import { StateInsert, StateSelect, stateTable } from "../drizzle/schema"

type FetchingAll = {
    limit?: number;
    detailed?: boolean;
  };
  type FetchingOne = {
    detailed?: boolean;
  }

export const getStates = async(option?: FetchingAll) : Promise<StateSelect[] | null>=>{
   const detailed = Boolean(option?.detailed)
   const limit = Number(option?.limit)
    
    if(detailed){
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
    }else{
        if(limit>0){
            return await db.query.stateTable.findMany({limit: limit})
        }
        return await db.query.stateTable.findMany()
    }
}



export const getState = async(id: number,option?:FetchingAll): Promise<StateSelect | undefined>=>{
    const detailed = Boolean(option?.detailed)
    if(detailed){
        return await db.query.stateTable.findFirst(
            {
                where: eq(stateTable.id,id),
                with:{
                    cities:true,
                }
    
            }
        )    
    }else{
        return await db.query.stateTable.findFirst(
            {
                where: eq(stateTable.id,id),
            }
        )
    }
}

export const deleteState = async(id: number,options?: FetchingAll)=>{
    
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