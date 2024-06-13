import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { OrderInsert, OrderSelect, ordersTable } from "../drizzle/schema";

let message= "order status"

export const fetchingAll = async(): Promise<OrderSelect[] | null >=>{  
    return await db.query.ordersTable.findMany({
        with:{
            comments:{
                columns:{
                    comment_text:true
                }
            },
            deliveryAddress:{
                columns:{
                    street_address_1:true
                }
            },
            driver:{
                columns:{
                    delivering:true,        
                }
            },
            orderMenuItems:{
                columns:{
                    order_id:true,
                    menu_item_id:true                    
                }
            },
            orderStatus:{
                columns:{
                    status_id:true
                }
            },
            restaurant:{
                columns:{
                    street_address:true                    
                }
            },
            user:{
                columns:{
                    name:true,
                    contact_phone:true,
                    email:true
                }
            }
        }
    })
}

export const fetchOne = async(id: number): Promise<OrderSelect | undefined>=>{
    return await db.query.ordersTable.findFirst({
        where:eq(ordersTable.id,id),
         with:{
            comments:true,
            deliveryAddress:true,
            driver:true,
         }
    })
}

export const deleteOne = async(id: number): Promise<string>=>{
    await db.delete(ordersTable).where(eq(ordersTable.id,id))
    return  `${message} deleted`
}

export const insert = async (data: OrderInsert): Promise<string> => {
    await db.insert(ordersTable).values(data)
    return `${message} created successfully`;
}
export const update = async (id: number, data: OrderInsert): Promise<string | null> => {
    await db.update(ordersTable).set(data).where(eq(ordersTable.id, id))
    return `${message} updated successfully`;
}
