import { Router } from "express";
import expenseController from "../controllers/expense.controller.js";

const router = Router();

// GET /expense
router.get("/", expenseController.getAll);

// GET /expense/:id
router.get("/:id", expenseController.getById);

// POST /expense
router.post("/", expenseController.create);

// PATCH /expense/:id
router.patch("/:id", expenseController.update);

// DELETE /expense/:id
router.delete("/:id", expenseController.delete);

export default router;
