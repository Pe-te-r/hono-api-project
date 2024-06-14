import { Hono } from "hono";
import { createCategory, deleteOneCategory, getOneCategory, listCategory, updateCategoryData } from "./category.controller";
import { adminRoleAuth, allRoleAuth } from "../middleAuth/middleAuth.users";

export const categoryRoute= new Hono()

// getting all users
categoryRoute.get('/listCategories',allRoleAuth,listCategory)
// getting one user
categoryRoute.get("/getCategory/:id",allRoleAuth,getOneCategory)

// deleting a user
categoryRoute.delete("/deleteCategory/:id",adminRoleAuth,deleteOneCategory)

// updating a user
categoryRoute.put("/updateCategory/:id",adminRoleAuth,updateCategoryData)

// creating a new user
categoryRoute.post("/createCategory",adminRoleAuth,createCategory)
