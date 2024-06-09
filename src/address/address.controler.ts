import { Context } from "hono";
import { deleteAddress, fetchOneAddress, fetchingAllAddress, insertAddress, updateAddress } from "./address.service";

export const listAddress = async (c: Context) => {
  try {
    const data = await fetchingAllAddress();
    return c.json(data, 200);
  } catch (err) {
    console.log(err);
    return c.json({ error: err }, 500);
  }
};

export const getOneAddress = async (c: Context) => {
  try {
    const id = c.req.param("name");
    const address = await fetchOneAddress(Number(id));
    if(address==null) return c.json({"msg": "address not found"});
    return c.json(address, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const deleteOneAddress = async (c: Context) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const address = await fetchOneAddress(Number(id));
    if (address === undefined) return c.json({ msg: "address not found" });
    const result = await deleteAddress(Number(id));
    console.log(result)
    return c.json({ "msg": result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const createAdress = async (c: Context) => {
  try {
    const address = await c.req.json();
    const result = await insertAddress(address);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // console.log(error);
    return c.json({ "error": e }, 500);
  }
}

export const updateAddressData= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const address_exit = await fetchOneAddress(Number(id))
    const address= await c.req.json();
    if(address_exit === undefined) return c.json({"msg":`user ${id} not found`},404)
    const result = await updateAddress(Number(id), address);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    return c.json({"msg": e}, 500);
  }
}
