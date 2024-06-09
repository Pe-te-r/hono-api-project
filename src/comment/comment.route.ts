import { Hono } from "hono";
import { createComment, deleteOneComment, getOneComment, listComments, updateCommentData } from "./comment.controler";

export const commentRoute = new Hono()

// getting all comments
commentRoute.get('/listComments',listComments)
// getting one comment
commentRoute.get("/getComment/:name",getOneComment)

// deleting a comment
commentRoute.delete("/deleteComment/:id",deleteOneComment)

// updating a comment
commentRoute.put("/updateComment/:id",updateCommentData)

// creating a new comment
commentRoute.post("/createComment",createComment)
