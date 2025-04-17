import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { ZodSchema } from "zod";

export function TypeValidator
  <T extends ZodSchema, Target extends keyof ValidationTargets>
  (target: Target, schema: T) {
    return zValidator(target, schema, (res, c) => {
      if (!res.success) {
        return c.text(res.error.issues.map(issue => `[${issue.path.join(",")}]: ${issue.message}`).join(","), 400)
      }
    })
  }