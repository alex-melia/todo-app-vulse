import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { UserSchema } from "../schemas/user"
import { verifyPassword } from "../utils/verifyPassword"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { hashPassword } from "../utils/hashPassword"

const prisma = new PrismaClient()

export async function signUp(req: Request, res: Response) {
  try {
    const validatedData = UserSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({
      where: {
        username: validatedData.username,
      },
    })

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with that username already exists" })
    }

    const hashedPassword = await hashPassword(validatedData.password)

    const user = await prisma.user.create({
      data: { username: validatedData.username, password: hashedPassword },
    })

    return res.status(201).json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const validatedData = UserSchema.parse(req.body)
    const user = await prisma.user.findUnique({
      where: {
        username: validatedData.username,
      },
    })

    if (!user) {
      return res
        .status(404)
        .json({ error: "Username and/or password is incorrect" })
    }

    const isPasswordCorrect = await verifyPassword(
      validatedData.password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" })
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      `${process.env.JWT_SECRET}`
    )

    req.session = {
      jwt: userJwt,
    }

    return res.status(200).json(userJwt)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
