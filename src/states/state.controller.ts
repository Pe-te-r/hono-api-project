import { Context } from "hono";
import { createStateData, deleteState, getState, getStates, updateStateData } from "./state.service";

export const getAllStates= async(c: Context)=>{ 
    const limitParam = c.req.query('limit');
    const limit = limitParam ? parseInt(limitParam,10): undefined;
   const states = await getStates(limit? {limit}: undefined)
   return c.json(states,200)
}

export const getOneState=async(c: Context)=>{
    const id= c.req.param('id')
    const state = await getState(Number(id))
    if(state===undefined) return c.json({"msg":"state does not exist"},404)
    return c.json(state,200)
}


export const deleteOneState=async(c: Context)=>{
    const id= c.req.param('id')
    const state_exists = await getState(Number(id))
    if(state_exists===undefined) return c.json({"msg":"state does not exist"},404)
    const state = await deleteState(Number(id))
    return c.json({"msg":state},200)
}

export const updateState=async(c: Context)=>{
    try {
        const id = c.req.param('id')
        const state_data=await c.req.json()
        const state_exits=await getState(Number(id))
        if(state_exits===undefined) return c.json({"msg":"state does not exist"},404)
        const state = await updateStateData(Number(id),state_data)
        return c.json({"msg":state},200)
    } catch (error) {
        return c.json({"msg":error},200)  
    }

}
export const createState=async(c: Context)=>{
    const state_data=await c.req.json()
    const state = await createStateData(state_data)
    return c.json({"msg":state},200)
}