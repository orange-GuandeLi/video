import { Hono } from "hono";
import { db } from "../../db";
import { TodoTable } from "../../db/schema/todo";

export const todo = new Hono()
  .get("/", async (c) => { //请求所有todo
    const res = await db.select().from(TodoTable);
    return c.json(res, 200);
  })
  .post("/", async (c) => {
    const body = await c.req.json()
    const res = await db
      .insert(TodoTable)
      .values(body)
      .returning()
      .then(r => r[0]);
    
    if (!res) {
      throw new Error("Faild to insert Todo");
    }
    return c.json(res, 201);
  })