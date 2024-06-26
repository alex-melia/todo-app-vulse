import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"
import { ListSchema } from "../schemas/list"

const prisma = new PrismaClient()

export async function getLists(req: Request, res: Response) {
  try {
    const lists = await prisma.list.findMany({
      include: {
        items: true,
      },
    })

    if (!lists) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not fetch lists" })
    }

    return res.status(200).json(lists)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export async function getUserLists(req: Request, res: Response) {
  try {
    const { userId } = req.params
    const lists = await prisma.list.findMany({
      where: {
        user_id: userId,
      },
      include: {
        items: true,
      },
    })

    if (!lists) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not fetch lists" })
    }

    return res.status(200).json(lists)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export async function createList(req: Request, res: Response) {
  try {
    const validatedData = ListSchema.parse(req.body)
    const list = await prisma.list.create({ data: validatedData })

    if (!list) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not fetch list" })
    }

    return res.status(201).json(list)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

export async function deleteList(req: Request, res: Response) {
  try {
    const { listId } = req.params

    const deletedList = await prisma.list.delete({
      where: {
        id: listId,
      },
    })

    if (!deletedList) {
      return res
        .status(400)
        .json({ error: "Server Error: Could not delete list" })
    }

    return res.status(201).json(deletedList)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
