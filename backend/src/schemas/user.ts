import { z } from "zod"

const UserSchema = z.object({
  id: z.string().cuid().optional(),
  username: z.string(),
  password: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export { UserSchema }
