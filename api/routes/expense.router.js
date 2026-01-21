import { Router } from "express";
import expenseController from "../controllers/expense.controller.js";
import { validateDate } from "../middlewares/common.middleware.js";

const router = Router();

// GET /expense
router.get("/expenses", expenseController.getAll);

// GET /expense/:id
router.get("/expenses:id", expenseController.getById);

router.get("/expenses/by-month/:date", validateDate, expenseController.getAllByMonth);

// POST /expense
router.post("/expenses", expenseController.create);

// PATCH /expense/:id
router.patch("/expenses/:id", expenseController.update);

// DELETE /expense/:id
router.delete("/expenses/:id", expenseController.delete);

export default router;
