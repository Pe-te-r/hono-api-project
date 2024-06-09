import { Context } from "hono";
import { deleteComment, fetchOneComment, fetchingAllComment, insertComment, updateComment } from "./comment.service";


export const listComments = async (c: Context) => {
  try {
    const comments = await fetchingAllComment();
    return c.json(comments, 200);
  } catch (e) {
    console.log(e);
    return c.json({ error: e }, 500);
  }
};

export const getOneComment = async (c: Context) => {
  try {
    const id = c.req.param("name");
    const comment = await fetchOneComment(Number(id));
    if(comment==null) return c.json({"msg": "comment not found"});
    return c.json(comment, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const deleteOneComment = async (c: Context) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const comment = await fetchOneComment(Number(id));
    if (comment === undefined) return c.json({ msg: "comment not found" });
    const result = await deleteComment(Number(id));
    return c.json({ "msg": result }, 200);
  } catch (e) {
    console.log(e);
    return c.json({ "error": e }, 500);
  }
};

export const createComment = async (c: Context) => {
  try {
    const user = await c.req.json();
    const result = await insertComment(user);
    return c.json({ msg: result}, 200);
  } catch (e: any) {
    // console.log(error);
    return c.json({ "error": e }, 500);
  }
}

export const updateCommentData= async(c: Context)=>{
  try {
    const id = c.req.param("id");
    const comment_exit = await fetchOneComment(Number(id))
    // console.log(user_exit)
    if(comment_exit === undefined) return c.json({"msg":`comment ${id} not found`},404)
      const comment = await c.req.json();
    const result = await updateComment(Number(id), comment);
    return c.json({ msg: result }, 200);
  } catch (e: any) {
    console.log(e);
    return c.json({"msg": e}, 500);
  }
}
