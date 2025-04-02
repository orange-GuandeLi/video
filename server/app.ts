import { Hono } from "hono";
import { todo } from "./todo";

export const app = new Hono()
  .notFound((c) => {
    return c.text("Not Found", 404);
  })
  .onError((err, c) => {
    console.error(`${err}`);
    return c.text(`${err}`, 500);
  });

const apiRotuer = app
  .basePath("/api")
  .route("/todo", todo);

export type ApiRotuer = typeof apiRotuer;