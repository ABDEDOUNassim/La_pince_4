import { Router } from "express";
import expenseController from "../controllers/expense.controller.js";
import { validateDate } from "../middlewares/common.middleware.js";
import { validateId } from '../middlewares/common.middleware.js';
import { validateCreateExpense, validateUpdateExpense } from '../middlewares/expense.middleware.js';

const router = Router();

// GET /expense
router.get("/expenses", expenseController.getAll);

// GET /expense/:id
router.get("/expenses/:id", validateId, expenseController.getById);

router.get("/expenses/by-month/:date", validateDate, expenseController.getAllByMonth);

// POST /expense
router.post("/expenses", validateCreateExpense, expenseController.create);

// PATCH /expense/:id
router.patch("/expenses/:id", validateId, validateUpdateExpense, expenseController.update);

// DELETE /expense/:id
router.delete("/expenses/:id", expenseController.delete);

export default router;
