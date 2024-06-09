import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema"

export const client = new Client({
    connectionString: process.env.Database_URL as string,  
})

const main = async () => {
    await client.connect();
    console.log("Connected to database") 
}
main().catch((err)=>{
    console.log(err);
    process.exit(1);
});


const db = drizzle(client, { schema, logger: true }) 

export default db;