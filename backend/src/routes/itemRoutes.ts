import express from "express"
import {
  createItem,
  deleteItem,
  setComplete,
  setIncomplete,
} from "../controllers/itemController"

const router = express.Router()

router.post("/", createItem)
router.patch("/:itemId/complete", setComplete)
router.patch("/:itemId/incomplete", setIncomplete)
router.delete("/:itemId", deleteItem)

export { router as itemRoutes }
