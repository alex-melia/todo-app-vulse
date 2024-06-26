import { z } from "zod"

const ListSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.string().cuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export { ListSchema }
