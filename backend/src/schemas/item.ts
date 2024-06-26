import { z } from "zod"

const ItemSchema = z.object({
  id: z.string().cuid().optional(),
  list_id: z.string(),
  description: z.string(),
  isComplete: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export { ItemSchema }
