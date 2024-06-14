import { Hono } from "hono";
import { createComment, deleteOneComment, getOneComment, listComments, updateCommentData } from "./comment.controler";
import { allRoleAuth, userRoleAuth } from "../middleAuth/middleAuth.users";

export const commentRoute = new Hono()

// getting all comments
commentRoute.get('/listComments',allRoleAuth,listComments)
// getting one comment
commentRoute.get("/getComment/:name",allRoleAuth,getOneComment)

// deleting a comment
commentRoute.delete("/deleteComment/:id",userRoleAuth,deleteOneComment)

// updating a comment
commentRoute.put("/updateComment/:id",userRoleAuth,updateCommentData)

// creating a new comment
commentRoute.post("/createComment",userRoleAuth,createComment)
