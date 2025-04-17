import { Hono } from "hono";
import { db } from "../../db";
import { TodoTable } from "../../db/schema/todo";

import { z } from 'zod';
import { TypeValidator } from "../middleware/type-validator";

const schema = z.object({
  title: z.string().min(1).max(10),
  description: z.string().min(1).optional(),
});

export const todo = new Hono()
  .get("/", async (c) => { //请求所有todo
    const res = await db.select().from(TodoTable);
    return c.json(res, 200);
  })
  .post("/", TypeValidator("json", schema), async (c) => {
    const body = c.req.valid("json");
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