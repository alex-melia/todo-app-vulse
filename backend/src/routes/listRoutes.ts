import express from "express"
import {
  createList,
  deleteList,
  getLists,
  getUserLists,
} from "../controllers/listController"

const router = express.Router()

router.post("/", createList)
router.delete("/:listId", deleteList)
router.get("/", getLists)
router.get("/:userId", getUserLists)

export { router as listRoutes }
