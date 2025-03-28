import { db } from "./db";
import { TodoTable } from "./db/schema/todo";

// insert one
await db.insert(TodoTable).values({
  title: "这是第一个todo",
  description: "这是第一个todo的描述",
  completed: false
})

// get all todos
console.log(
  await db.select().from(TodoTable)
)