import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"
import { ItemSchema } from "../schemas/item"

const prisma = new PrismaClient()

export async function createItem(req: Request, res: Response) {
  try {
    const validatedData = ItemSchema.parse(req.body)
    const item = await prisma.item.create({ data: validatedData })

    if (!item) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not create item" })
    }

    return res.status(201).json(item)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

export async function setComplete(req: Request, res: Response) {
  try {
    const { itemId } = req.params

    const updatedItem = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        isComplete: true,
      },
    })

    if (!updatedItem) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not update item" })
    }

    return res.status(201).json(updatedItem)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

export async function setIncomplete(req: Request, res: Response) {
  try {
    const { itemId } = req.params

    const updatedItem = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        isComplete: false,
      },
    })

    if (!updatedItem) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not update item" })
    }

    return res.status(201).json(updatedItem)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const { itemId } = req.params

    const deletedItem = await prisma.item.delete({
      where: {
        id: itemId,
      },
    })

    if (!deletedItem) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not delete item" })
    }

    return res.status(201).json(deletedItem)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
