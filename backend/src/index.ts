import express from "express"
import dotenv from "dotenv"
import { connectToDB } from "./loaders/db"

import { listRoutes } from "./routes/listRoutes"
import { itemRoutes } from "./routes/itemRoutes"
import { authRoutes } from "./routes/authRoutes"

dotenv.config()

const app = express()

// Middlewares
app.set("trust proxy", true)
app.use(express.json())

// Routes
app.use("/api/lists", listRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/auth", authRoutes)

app.all("*", async (req, res) => {
  return res.status(404).json("Route not found")
})

const port = process.env.PORT

try {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

  connectToDB()
} catch (err) {
  console.log(err)
}
