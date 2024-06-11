import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// import { Client } from "pg";
import * as schema from "./schema"

// export const client = new Client({
//     connectionString: process.env.Database_URL as string,  
// })

export const connection = neon(process.env.Database_URL as string)

// const main = async () => {
//     await client.connect();
//     console.log("Connected to database") 
// }
// main().catch((err)=>{
//     console.log(err);
//     process.exit(1);
// });


const db = drizzle(connection, { schema, logger: true }) 

export default db;