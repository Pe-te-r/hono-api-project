import { Hono } from "hono";
import { createCategory, deleteOneCategory, getOneCategory, listCategory, updateCategoryData } from "./category.controller";

export const categoryRoute= new Hono()

// getting all users
categoryRoute.get('/listCategories',listCategory)
// getting one user
categoryRoute.get("/getCategory/:id",getOneCategory)

// deleting a user
categoryRoute.delete("/deleteCategory/:id",deleteOneCategory)

// updating a user
categoryRoute.put("/updateCategory/:id",updateCategoryData)

// creating a new user
categoryRoute.post("/createCategory",createCategory)
